import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { WalletInfo, SignatureChallenge } from '../types/api'

type WalletProvider = 'phantom' | 'solflare'

interface WalletContextType {
  wallet: WalletInfo | null
  isConnecting: boolean
  isVerifying: boolean
  connect: (provider?: WalletProvider) => Promise<void>
  disconnect: () => Promise<void>
  signMessage: (message: string) => Promise<string>
  verifyWithX402: () => Promise<boolean>
  getBalance: () => Promise<number | null>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface WalletProviderProps {
  children: React.ReactNode
  x402Endpoint?: string
}

export function WalletProvider({ children, x402Endpoint = '/api/x402' }: WalletProviderProps) {
  const {
    publicKey,
    connected,
    connecting,
    disconnect: solanaDisconnect,
    signMessage: solanaSignMessage
  } = useSolanaWallet()
  //const { connection } = useConnection();

  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Sync with Solana wallet adapter
  useEffect(() => {
    if (connected && publicKey) {
      setWallet({
        publicKey: publicKey.toString(),
        isConnected: true,
        isVerified: false,
        role: null
      })
    } else {
      setWallet(null)
    }
  }, [connected, publicKey])

  const connect = useCallback(async () => {
    // This will be handled by the Solana wallet adapter
    // The actual connection is triggered by the wallet button/modal
    throw new Error('Use WalletMultiButton from @solana/wallet-adapter-react-ui for connection')
  }, [])

  const disconnect = useCallback(async () => {
    try {
      await solanaDisconnect()
    } catch (error) {
      console.error('Wallet disconnect failed:', error)
      // Force disconnect on frontend even if API call fails
      setWallet(null)
    }
  }, [solanaDisconnect])

  const signMessage = useCallback(
    async (message: string): Promise<string> => {
      if (!wallet?.isConnected || !solanaSignMessage) {
        throw new Error('Wallet not connected or not supported')
      }

      try {
        const messageBytes = new TextEncoder().encode(message)
        const signature = await solanaSignMessage(messageBytes)
        return Array.from(signature)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
      } catch (error) {
        console.error('Message signing failed:', error)
        throw new Error('Failed to sign message')
      }
    },
    [wallet, solanaSignMessage]
  )

  const verifyWithX402 = useCallback(async (): Promise<boolean> => {
    if (!wallet?.isConnected) {
      throw new Error('Wallet not connected')
    }

    setIsVerifying(true)

    try {
      // Create signature challenge
      const challenge: SignatureChallenge = {
        message: `Verify ownership of wallet ${wallet.publicKey} for Adx402 protocol`,
        timestamp: Date.now()
      }

      // Sign the challenge
      const signature = await signMessage(JSON.stringify(challenge))

      // Verify with x402 endpoint
      const response = await fetch(`${x402Endpoint}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wallet: wallet.publicKey,
          signature,
          challenge
        })
      })

      if (!response.ok) {
        throw new Error('x402 verification failed')
      }

      const result = await response.json()

      // Update wallet with verification status and role
      setWallet((prev) =>
        prev
          ? {
              ...prev,
              isVerified: true,
              role: result.role || null
            }
          : null
      )

      return true
    } catch (error) {
      console.error('x402 verification failed:', error)
      setWallet((prev) => (prev ? { ...prev, isVerified: false } : null))
      return false
    } finally {
      setIsVerifying(false)
    }
  }, [wallet, signMessage, x402Endpoint])

  const getBalance = useCallback(async (): Promise<number | null> => {
    if (!wallet?.isConnected) return null

    try {
      // This would integrate with Solana web3.js or similar
      // For now, return mock balance
      return 0.5 // Mock SOL balance
    } catch (error) {
      console.error('Failed to get balance:', error)
      return null
    }
  }, [wallet])

  const value: WalletContextType = {
    wallet,
    isConnecting: connecting,
    isVerifying,
    connect,
    disconnect,
    signMessage,
    verifyWithX402,
    getBalance
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Utility hook for wallet-dependent actions
export function useWalletGuard(): {
  requireWallet: () => boolean
  requireVerification: () => boolean
} {
  const { wallet } = useWallet()

  return {
    requireWallet: useCallback(() => {
      if (!wallet?.isConnected) {
        throw new Error('Wallet connection required')
      }
      return true
    }, [wallet]),

    requireVerification: useCallback(() => {
      if (!wallet?.isVerified) {
        throw new Error('Wallet verification required')
      }
      return true
    }, [wallet])
  }
}
