import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea, Label } from '../components/ui/Input'
import { mockAds, mockMetrics } from '../data/mockData'
import { useWallet } from '../contexts'

const aspectOptions = ['16x9', '1x1', '5x6', '4x3']

export function BrandDashboard() {
  const { wallet } = useWallet()
  const topMetrics = useMemo(() => mockMetrics.slice(0, 3), [])
  const activeAds = mockAds.filter(ad => ad.status === 'approved')

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-text-secondary">Brand Console</p>
            <h1 className="text-3xl font-semibold">Manage your campaigns</h1>
          </div>
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            <div className="text-sm text-text-secondary">
              {wallet?.publicKey
                ? `Connected wallet: ${wallet.publicKey.slice(0, 4)}…${wallet.publicKey.slice(-4)}`
                : 'Connect your wallet to publish ads'}
            </div>
            <WalletMultiButton className="!bg-primary !text-white hover:!bg-primary/90" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 space-y-8">
        <section className="grid gap-6 md:grid-cols-3">
          {topMetrics.map((metric, index) => (
            <Card key={metric.period + index}>
              <CardHeader>
                <CardDescription>Period: {metric.period}</CardDescription>
                <CardTitle className="text-4xl text-primary">{metric.impressions.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">Impressions</p>
                <div className="mt-3 text-sm text-text-muted">
                  {metric.clicks} clicks · {metric.ctr}% CTR · {metric.earnings} SOL spent
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Create a new ad</CardTitle>
              <CardDescription>Upload your creative and pay the fee afterwards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-url" required>Destination URL</Label>
                <Input id="ad-url" placeholder="https://your-site.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-tags">Tags (comma separated)</Label>
                <Input id="ad-tags" placeholder="tech, gaming, solana" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-image" required>Banner image</Label>
                <label
                  htmlFor="ad-image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface px-4 py-8 text-center text-sm text-text-secondary hover:border-primary"
                >
                  <span className="font-medium text-text">Drop your banner here</span>
                  <span className="text-text-muted">PNG, JPG or GIF · max 5MB</span>
                  <Input id="ad-image" type="file" accept="image/*" className="hidden" />
                </label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad-aspect">Aspect Ratio</Label>
                <select
                  id="ad-aspect"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text"
                >
                  {aspectOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="w-full">Submit for moderation</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your ads</CardTitle>
              <CardDescription>Track status, targeting and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAds.map(ad => (
                <div key={ad.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-text-secondary">Ad ID</p>
                      <p className="font-medium">{ad.id}</p>
                    </div>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-sm text-success">Approved</span>
                  </div>
                  <div className="mt-3 grid gap-3 text-sm text-text-secondary md:grid-cols-3">
                    <div>
                      <p className="text-text-muted">Aspect Ratio</p>
                      <p className="text-text">{ad.aspectRatio}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Tags</p>
                      <p className="text-text">{ad.tags.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Impressions</p>
                      <p className="text-text">{ad.impressions.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      View metrics
                    </Button>
                    <Button variant="ghost" size="sm">
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
