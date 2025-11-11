import type { Address } from '@solana/addresses'
import type { WalletContextState } from '@solana/wallet-adapter-react'
import type { Signer } from 'x402-axios'
import type { Transaction as KitTransaction } from '@solana/transactions'
import {
  Message,
  Transaction as LegacyTransaction,
  VersionedMessage,
  VersionedTransaction
} from '@solana/web3.js'
import { Buffer } from 'buffer'

type WalletSignerConfig = {
  abortSignal?: AbortSignal
}

export function createWalletAdapterSigner(wallet: WalletContextState): Signer {
  if (!wallet.publicKey) {
    throw new Error('Wallet no conectada')
  }

  if (!wallet.signTransaction && !wallet.signAllTransactions) {
    throw new Error('La wallet no soporta firmas de transacciones')
  }

  const address = wallet.publicKey.toBase58()

  const signer = {
    address,
    async signTransactions(transactions: readonly KitTransaction[], config?: WalletSignerConfig) {
      ensureNotAborted(config?.abortSignal)

      const converted = transactions.map((tx) => kitTransactionToWeb3(tx))
      let signed

      if (wallet.signAllTransactions) {
        signed = await wallet.signAllTransactions(converted)
      } else if (wallet.signTransaction) {
        signed = []
        for (const tx of converted) {
          ensureNotAborted(config?.abortSignal)
          signed.push(await wallet.signTransaction(tx))
        }
      } else {
        throw new Error('La wallet no expone métodos para firmar')
      }

      return signed.map((signedTx) => {
        const signature = extractSignatureForAddress(signedTx, address)
        if (!signature) {
          throw new Error('No se pudo obtener la firma de la wallet conectada')
        }
        return {
          [address]: signature
        }
      })
    }
  }

  // Cast through `unknown` because the Signer type union incluye firmas EVM/SVM completas.
  // Solo utilizamos el método `signTransactions`, por lo que el resto se deja sin implementar.
  return signer as unknown as Signer
}

function ensureNotAborted(signal?: AbortSignal) {
  if (!signal) return
  if (signal.aborted) {
    throw signal.reason ?? new DOMException('Aborted', 'AbortError')
  }
}

function kitTransactionToWeb3(tx: KitTransaction) {
  const messageBytes = Buffer.from(tx.messageBytes)
  const isVersioned = (messageBytes[0] & 0x80) !== 0

  if (isVersioned) {
    const message = VersionedMessage.deserialize(messageBytes)
    const versionedTx = new VersionedTransaction(message)

    if (tx.signatures) {
      versionedTx.signatures = versionedTx.signatures.map((existing, index) => {
        const key = message.staticAccountKeys[index].toBase58()
        const provided = tx.signatures?.[key as Address]
        return provided ? Buffer.from(provided) : existing
      })
    }

    return versionedTx
  }

  const legacyMessage = Message.from(messageBytes)
  const legacyTx = LegacyTransaction.populate(legacyMessage, [])

  if (tx.signatures) {
    legacyTx.signatures = legacyTx.signatures.map((entry) => {
      const provided = tx.signatures?.[entry.publicKey.toBase58() as Address]
      return {
        ...entry,
        signature: provided ? Buffer.from(provided) : entry.signature
      }
    })
  }

  return legacyTx
}

function extractSignatureForAddress(
  tx: VersionedTransaction | LegacyTransaction,
  address: string
): Uint8Array | null {
  if (tx instanceof VersionedTransaction) {
    const index = tx.message.staticAccountKeys.findIndex((key) => key.toBase58() === address)
    if (index === -1) return null
    const signature = tx.signatures[index]
    return signature ? new Uint8Array(signature) : null
  }

  const entry = tx.signatures.find((sig) => sig.publicKey.toBase58() === address)
  if (!entry || !entry.signature) {
    return null
  }

  return new Uint8Array(entry.signature)
}
