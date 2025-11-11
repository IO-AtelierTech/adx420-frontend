import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label, Textarea } from '../components/ui/Input'
import { mockPublishers, mockMetrics } from '../data/mockData'
import { useWallet } from '../contexts'

const publisher = mockPublishers[0]

export function PublisherDashboard() {
  const { wallet } = useWallet()

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
          <Card>
            <CardHeader>
              <CardTitle>Register a slot</CardTitle>
              <CardDescription>Generate a token to verify your domain</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='slot-id' required>
                  Slot ID (CSS selector)
                </Label>
                <Input id='slot-id' placeholder='#adx-slot' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='slot-tags'>Tags</Label>
                <Input id='slot-tags' placeholder='tech, fintech' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='slot-ratio'>Allowed aspect ratios</Label>
                <Textarea id='slot-ratio' placeholder='16x9, 1x1' />
              </div>
              <Button className='w-full'>Generate snippet</Button>
            </CardContent>
          </Card>

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
