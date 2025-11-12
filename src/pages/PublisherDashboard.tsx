import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { mockPublishers, mockMetrics } from '../data/mockData'
import { useWallet } from '../contexts'
import { registerPublisher, createSlot } from '../services/publisher'
import { useState } from 'react'
import { createWalletAdapterSigner } from '../utils/x402WalletSigner'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'

const publisher = mockPublishers[0]

export function PublisherDashboard() {
  const { wallet } = useWallet()
  const solanaWallet = useSolanaWallet()

  // Publisher registration form state
  const [publisherForm, setPublisherForm] = useState({
    domain: '',
    tags: ''
  })
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const [isPublisherAlreadyRegistered, setIsPublisherAlreadyRegistered] = useState(false)

  // Slot creation form state
  const [slotForm, setSlotForm] = useState({
    slotId: '',
    tags: '',
    aspectRatios: ''
  })
  const [isCreatingSlot, setIsCreatingSlot] = useState(false)
  const [slotCreationSuccess, setSlotCreationSuccess] = useState(false)

  // Handle publisher registration
  const handleRegisterPublisher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet?.publicKey || !solanaWallet.publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsRegistering(true)
    setRegistrationError(null)
    setIsPublisherAlreadyRegistered(false)
    
    try {
      const signer = createWalletAdapterSigner(solanaWallet)
      const tags = publisherForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      
      await registerPublisher({
        signer,
        walletAddress: wallet.publicKey,
        domain: publisherForm.domain,
        tags
      })

      setRegistrationSuccess(true)
      setPublisherForm({ domain: '', tags: '' })
    } catch (error) {
      console.error('Registration failed:', error)
      
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const errorData = error.response.data.error
        
        if (errorData.code === 'PUBLISHER_ALREADY_EXISTS') {
          setIsPublisherAlreadyRegistered(true)
          setRegistrationError('You are already registered as a publisher with this wallet address.')
        } else {
          setRegistrationError(errorData.message || 'Registration failed. Please try again.')
        }
      } else {
        setRegistrationError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsRegistering(false)
    }
  }

  // Handle slot creation
  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet?.publicKey || !solanaWallet.publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsCreatingSlot(true)
    try {
      const signer = createWalletAdapterSigner(solanaWallet)
      const tags = slotForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      const aspectRatios = slotForm.aspectRatios.split(',').map(ratio => ratio.trim()).filter(Boolean)
      
      await createSlot({
        signer,
        wallet: wallet.publicKey,
        slotId: slotForm.slotId,
        tags,
        aspectRatios
      })

      setSlotCreationSuccess(true)
      setSlotForm({ slotId: '', tags: '', aspectRatios: '' })
    } catch (error) {
      console.error('Slot creation failed:', error)
      alert('Slot creation failed. Please try again.')
    } finally {
      setIsCreatingSlot(false)
    }
  }

  return (
    <div className='min-h-screen bg-background text-text'>
      <div className='border-b border-border bg-surface'>
        <div className='container mx-auto flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm text-text-secondary'>Publisher Console</p>
            <h1 className='text-3xl font-semibold'>Monetize your inventory</h1>
          </div>
          <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
            <div className='text-sm text-text-secondary'>
              {wallet?.publicKey
                ? `Connected wallet: ${wallet.publicKey.slice(0, 4)}…${wallet.publicKey.slice(-4)}`
                : 'Connect your wallet to register slots'}
            </div>
            <WalletMultiButton className='!bg-primary !text-white hover:!bg-primary/90' />
          </div>
        </div>
      </div>

      <main className='container mx-auto px-6 py-8 space-y-8'>
        <section className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardDescription>Domain</CardDescription>
              <CardTitle>{publisher.siteUrl}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary'>Tags: {publisher.tags.join(', ')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total earnings</CardDescription>
              <CardTitle className='text-success'>{publisher.totalEarnings} SOL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary'>
                Impressions: {publisher.totalImpressions.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active slots</CardDescription>
              <CardTitle>{publisher.slotsCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary'>
                Clicks: {publisher.totalClicks.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className='grid gap-6 lg:grid-cols-2'>
          {!registrationSuccess && !isPublisherAlreadyRegistered ? (
            <Card>
              <CardHeader>
                <CardTitle>Register as Publisher</CardTitle>
                <CardDescription>Register your domain to start monetizing your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                {registrationError && (
                  <div className='mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm'>
                    ⚠️ {registrationError}
                  </div>
                )}
                <form onSubmit={handleRegisterPublisher} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='domain' required>
                      Domain
                    </Label>
                    <Input 
                      id='domain' 
                      placeholder='example.com'
                      value={publisherForm.domain}
                      onChange={(e) => setPublisherForm(prev => ({ ...prev, domain: e.target.value }))}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='publisher-tags'>Tags (comma-separated)</Label>
                    <Input 
                      id='publisher-tags' 
                      placeholder='technology, gaming, news'
                      value={publisherForm.tags}
                      onChange={(e) => setPublisherForm(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                  <Button 
                    type='submit' 
                    className='w-full' 
                    disabled={isRegistering || !wallet?.publicKey}
                  >
                    {isRegistering ? 'Registering...' : 'Register as Publisher'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : registrationSuccess ? (
            <Card>
              <CardHeader>
                <CardTitle>✅ Publisher Registered</CardTitle>
                <CardDescription>You are now registered as a publisher!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='p-4 bg-success/10 border border-success/20 rounded-lg text-success'>
                  <p className='font-semibold'>Registration Complete</p>
                  <p className='text-sm'>You can now create advertising slots for your website.</p>
                </div>
              </CardContent>
            </Card>
          ) : isPublisherAlreadyRegistered ? (
            <Card>
              <CardHeader>
                <CardTitle>✅ Already Registered</CardTitle>
                <CardDescription>You're already set up as a publisher</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary'>
                  <p className='font-semibold'>Publisher Status: Active</p>
                  <p className='text-sm'>Your wallet is already registered as a publisher. You can continue creating advertising slots for your websites.</p>
                </div>
                <div className='mt-4'>
                  <Button 
                    variant='outline' 
                    size='sm'
                    onClick={() => {
                      setIsPublisherAlreadyRegistered(false)
                      setRegistrationError(null)
                    }}
                  >
                    Register Another Domain
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Register a slot</CardTitle>
              <CardDescription>Create a new advertising slot for your website</CardDescription>
            </CardHeader>
            <CardContent>
              {slotCreationSuccess && (
                <div className='mb-4 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm'>
                  ✅ Slot created successfully! You can now add it to your website.
                </div>
              )}
              <form onSubmit={handleCreateSlot} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='slot-id' required>
                    Slot ID (CSS selector)
                  </Label>
                  <Input 
                    id='slot-id' 
                    placeholder='#adx-slot or .ad-banner'
                    value={slotForm.slotId}
                    onChange={(e) => setSlotForm(prev => ({ ...prev, slotId: e.target.value }))}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='slot-tags'>Tags (comma-separated)</Label>
                  <Input 
                    id='slot-tags' 
                    placeholder='tech, fintech, gaming'
                    value={slotForm.tags}
                    onChange={(e) => setSlotForm(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='slot-ratio'>Allowed aspect ratios (comma-separated)</Label>
                  <Input 
                    id='slot-ratio' 
                    placeholder='16:9, 4:3, 1:1'
                    value={slotForm.aspectRatios}
                    onChange={(e) => setSlotForm(prev => ({ ...prev, aspectRatios: e.target.value }))}
                  />
                </div>
                <Button 
                  type='submit' 
                  className='w-full' 
                  disabled={isCreatingSlot || !wallet?.publicKey}
                >
                  {isCreatingSlot ? 'Creating...' : 'Create Slot'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Snippet ready to embed</CardTitle>
              <CardDescription>Refresh it whenever you add a new slot</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className='rounded-lg bg-surface p-4 text-sm text-text'>
                {`<div id="adx-slot"></div>
<script type="module">
  import { adx402 } from '@io-ateliertech/adx402-sdk';

  adx402.init({
    wallet: '${publisher.wallet}',
    tags: ['${publisher.tags.join("','")}']
  });

  adx402.render('#adx-slot', {
    aspectRatio: '16x9'
  });
</script>`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Recent history</CardTitle>
              <CardDescription>Weekly settlements</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {mockMetrics.slice(0, 4).map((metric, index) => (
                <div
                  key={index}
                  className='flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4'
                >
                  <div>
                    <p className='text-sm text-text-muted'>Period</p>
                    <p className='font-semibold capitalize'>{metric.period}</p>
                  </div>
                  <div className='text-success'>{metric.earnings} SOL</div>
                  <Button size='sm' variant='outline'>
                    View details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
