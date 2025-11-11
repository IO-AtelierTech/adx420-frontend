import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet as useWalletAdapter } from '@solana/wallet-adapter-react'
import axios from 'axios'
import { type ChangeEvent, type FormEvent, useCallback, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { mockAds, mockMetrics } from '../data/mockData'
import { useWallet } from '../contexts'
import { uploadBrandAd } from '../services/brandAds'
import { createWalletAdapterSigner } from '../utils/x402WalletSigner'

const aspectOptions = ['16x9', '1x1', '5x6', '4x3']
const SOLANA_NETWORK =
  (import.meta.env.VITE_SOLANA_NETWORK as 'solana-devnet' | 'solana') ?? 'solana-devnet'

const shorten = (value: string) => `${value.slice(0, 4)}…${value.slice(-4)}`

function decodePaymentSignature(header?: string) {
  if (!header) return null
  try {
    const decoded = JSON.parse(atob(header))
    return typeof decoded.transaction === 'string' ? decoded.transaction : null
  } catch {
    return null
  }
}

export function BrandDashboard() {
  const { wallet } = useWallet()
  const solanaWallet = useWalletAdapter()

  const topMetrics = useMemo(() => mockMetrics.slice(0, 3), [])
  const activeAds = mockAds.filter((ad) => ad.status === 'approved')
  const explorerClusterSuffix = SOLANA_NETWORK === 'solana' ? '' : '?cluster=devnet'

  const [formValues, setFormValues] = useState({
    url: '',
    tags: '',
    aspectRatio: aspectOptions[0],
    file: null as File | null
  })

  const [submissionState, setSubmissionState] = useState<{
    isLoading: boolean
    message: string | null
    error: string | null
  }>({ isLoading: false, message: null, error: null })

  const [paymentReceipt, setPaymentReceipt] = useState<{
    raw: string
    signature: string | null
  } | null>(null)

  const walletAddress = solanaWallet.publicKey?.toBase58() ?? null

  const paymentSigner = useMemo(() => {
    if (!walletAddress) return null
    if (!solanaWallet.signTransaction && !solanaWallet.signAllTransactions) {
      return null
    }

    try {
      return createWalletAdapterSigner(solanaWallet)
    } catch (error) {
      console.error('No se pudo inicializar el signer de la wallet:', error)
      return null
    }
  }, [walletAddress, solanaWallet])

  const handleUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, url: event.target.value }))
    },
    [setFormValues]
  )

  const handleTagsChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, tags: event.target.value }))
    },
    [setFormValues]
  )

  const handleAspectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFormValues((prev) => ({ ...prev, aspectRatio: event.target.value }))
    },
    [setFormValues]
  )

  const handleCreativeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setFormValues((prev) => ({ ...prev, file }))
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!wallet?.publicKey) {
        setSubmissionState({
          isLoading: false,
          message: null,
          error: 'Conecta tu wallet para publicar anuncios'
        })
        return
      }

      if (!formValues.file) {
        setSubmissionState({
          isLoading: false,
          message: null,
          error: 'Selecciona un banner antes de continuar'
        })
        return
      }

      if (!paymentSigner) {
        setSubmissionState({
          isLoading: false,
          message: null,
          error: 'Tu wallet no permite firmar este pago. Reintenta con Phantom o Solflare'
        })
        return
      }

      setSubmissionState({ isLoading: true, message: null, error: null })
      setPaymentReceipt(null)

      const tags = formValues.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      try {
        const response = await uploadBrandAd({
          signer: paymentSigner,
          wallet: wallet.publicKey,
          file: formValues.file,
          targetUrl: formValues.url,
          tags
        })

        setSubmissionState({
          isLoading: false,
          message: response.data.message,
          error: null
        })

        const header = response.headers['x-payment-response'] as string | undefined
        if (header) {
          setPaymentReceipt({
            raw: header,
            signature: decodePaymentSignature(header)
          })
        }
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message as string) ||
            error.message ||
            'Error desconocido al publicar el anuncio'
          : 'Error inesperado al publicar el anuncio'

        setSubmissionState({
          isLoading: false,
          message: null,
          error: message
        })
      }
    },
    [formValues.file, formValues.tags, formValues.url, paymentSigner, wallet?.publicKey]
  )

  return (
    <div className='min-h-screen bg-background text-text'>
      <div className='border-b border-border bg-surface'>
        <div className='container mx-auto flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm text-text-secondary'>Brand Console</p>
            <h1 className='text-3xl font-semibold'>Manage your campaigns</h1>
          </div>
          <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
            <div className='text-sm text-text-secondary'>
              {wallet?.publicKey
                ? `Connected wallet: ${wallet.publicKey.slice(0, 4)}…${wallet.publicKey.slice(-4)}`
                : 'Connect your wallet to publish ads'}
            </div>
            <WalletMultiButton className='!bg-primary !text-white hover:!bg-primary/90' />
          </div>
        </div>
      </div>

      <main className='container mx-auto px-6 py-8 space-y-8'>
        <section className='grid gap-6 md:grid-cols-3'>
          {topMetrics.map((metric, index) => (
            <Card key={metric.period + index}>
              <CardHeader>
                <CardDescription>Period: {metric.period}</CardDescription>
                <CardTitle className='text-4xl text-primary'>
                  {metric.impressions.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-text-secondary'>Impressions</p>
                <div className='mt-3 text-sm text-text-muted'>
                  {metric.clicks} clicks · {metric.ctr}% CTR · {metric.earnings} SOL spent
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className='grid gap-6 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Create a new ad</CardTitle>
              <CardDescription>Upload your creative and pay the fee afterwards</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                  <Label htmlFor='ad-url' required>
                    Destination URL
                  </Label>
                  <Input
                    id='ad-url'
                    placeholder='https://your-site.com'
                    value={formValues.url}
                    onChange={handleUrlChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='ad-tags'>Tags (comma separated)</Label>
                  <Input
                    id='ad-tags'
                    placeholder='tech, gaming, solana'
                    value={formValues.tags}
                    onChange={handleTagsChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='ad-image' required>
                    Banner image
                  </Label>
                  <label
                    htmlFor='ad-image'
                    className='flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface px-4 py-8 text-center text-sm text-text-secondary hover:border-primary'
                  >
                    <span className='font-medium text-text'>
                      {formValues.file ? formValues.file.name : 'Drop your banner here'}
                    </span>
                    <span className='text-text-muted'>PNG, JPG or GIF · max 5MB</span>
                    <Input
                      id='ad-image'
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleCreativeChange}
                    />
                  </label>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='ad-aspect'>Aspect Ratio (for preview only)</Label>
                  <select
                    id='ad-aspect'
                    className='w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text'
                    value={formValues.aspectRatio}
                    onChange={handleAspectChange}
                  >
                    {aspectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <Button className='w-full' type='submit' isLoading={submissionState.isLoading}>
                  Submit for moderation
                </Button>
                {submissionState.error && (
                  <p className='text-sm text-error'>{submissionState.error}</p>
                )}
                {submissionState.message && (
                  <p className='text-sm text-success'>{submissionState.message}</p>
                )}
                {paymentReceipt?.signature && (
                  <p className='text-xs text-text-secondary'>
                    Payment tx:{' '}
                    <a
                      href={`https://explorer.solana.com/tx/${paymentReceipt.signature}${explorerClusterSuffix}`}
                      target='_blank'
                      rel='noreferrer'
                      className='text-primary underline'
                    >
                      {shorten(paymentReceipt.signature)}
                    </a>
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Your ads</CardTitle>
              <CardDescription>Track status, targeting and performance</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {activeAds.map((ad) => (
                <div key={ad.id} className='rounded-xl border border-border p-4'>
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div>
                      <p className='text-sm text-text-secondary'>Ad ID</p>
                      <p className='font-medium'>{ad.id}</p>
                    </div>
                    <span className='rounded-full bg-success/10 px-3 py-1 text-sm text-success'>
                      Approved
                    </span>
                  </div>
                  <div className='mt-3 grid gap-3 text-sm text-text-secondary md:grid-cols-3'>
                    <div>
                      <p className='text-text-muted'>Aspect Ratio</p>
                      <p className='text-text'>{ad.aspectRatio}</p>
                    </div>
                    <div>
                      <p className='text-text-muted'>Tags</p>
                      <p className='text-text'>{ad.tags.join(', ')}</p>
                    </div>
                    <div>
                      <p className='text-text-muted'>Impressions</p>
                      <p className='text-text'>{ad.impressions.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-wrap gap-3'>
                    <Button variant='outline' size='sm'>
                      View metrics
                    </Button>
                    <Button variant='ghost' size='sm'>
                      Pause ad
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
