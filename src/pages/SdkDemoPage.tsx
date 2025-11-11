import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { useWallet } from '../contexts'

export function SdkDemoPage() {
  const { wallet } = useWallet()
  const [walletAddress, setWalletAddress] = useState(wallet?.publicKey ?? '')
  const [tags, setTags] = useState('tech, gaming')
  const [aspectRatio, setAspectRatio] = useState('16x9')
  const [fallback, setFallback] = useState('/img/placeholder.png')

  const codeSnippet = `<div id="adx-demo-slot"></div>
<script type="module">
  import { adx402 } from '@io-ateliertech/adx402-sdk';

  adx402.init({
    wallet: '${walletAddress || 'YOUR_WALLET'}',
    tags: [${tags
      .split(',')
      .map((tag) => `'${tag.trim()}'`)
      .join(', ')}]
  });

  adx402.render('#adx-demo-slot', {
    aspectRatio: '${aspectRatio}',
    fallback: '${fallback}'
  });
</script>`

  return (
    <div className='min-h-screen bg-background text-text'>
      <div className='border-b border-border bg-surface'>
        <div className='container mx-auto flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm text-text-secondary'>SDK Playground</p>
            <h1 className='text-3xl font-semibold'>Test Adx402 live</h1>
          </div>
          <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
            <div className='text-sm text-text-secondary'>
              {wallet?.publicKey
                ? `Connected wallet: ${wallet.publicKey.slice(0, 4)}…${wallet.publicKey.slice(-4)}`
                : 'Connect a wallet to get started'}
            </div>
            <WalletMultiButton className='!bg-primary !text-white hover:!bg-primary/90' />
          </div>
        </div>
      </div>

      <main className='container mx-auto grid gap-6 px-6 py-8 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Configure your slot</CardTitle>
            <CardDescription>These values are passed to `adx402.render`</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='demo-wallet'>Publisher wallet</Label>
              <Input
                id='demo-wallet'
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder='e.g. 4f8P...Xa'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='demo-tags'>Tags</Label>
              <Input id='demo-tags' value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='demo-aspect'>Aspect Ratio</Label>
              <select
                id='demo-aspect'
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className='w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text'
              >
                {['16x9', '1x1', '5x6', 'auto'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='demo-fallback'>Fallback</Label>
              <Input
                id='demo-fallback'
                value={fallback}
                onChange={(e) => setFallback(e.target.value)}
              />
            </div>
            <Button className='w-full' variant='outline'>
              Render ad
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>The SDK will render the ad here</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='rounded-xl border border-dashed border-border p-8 text-center text-text-secondary'>
              Slot `#adx-demo-slot` ready to render.
            </div>
            <div>
              <p className='mb-2 text-sm font-medium text-text'>Generated snippet</p>
              <pre className='rounded-lg bg-surface p-4 text-sm text-text overflow-x-auto'>
                {codeSnippet}
              </pre>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
