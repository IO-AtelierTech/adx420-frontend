import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useTheme } from '../contexts';

export function LandingPage() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Adx402 logo" className="h-10 w-auto" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </button>

            <Link to="/demo">
              <Button variant="outline" size="sm">
                SDK Demo
              </Button>
            </Link>

            <Link to="/brand">
              <Button size="sm">
                Try as Brand
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-2">
            The web3-native pay-per-click network,
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            powered by Solana x402 payment rails
          </h2>
          <p className="text-2xl font-semibold text-text mb-6">
            The ad network that moves with on-chain money.
          </p>

          <div className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/brand">
              <Button size="lg" className="w-full sm:w-auto">
                Start as Brand
              </Button>
            </Link>

            <Link to="/publisher">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Start as Publisher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">Verify via x402</h3>
                <p className="text-text-secondary">
                  One tap x402 challenge proves wallet ownership and assigns a role (brand or publisher) on-chain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">Smart Matching</h3>
                <p className="text-text-secondary">
                  AI-powered matching connects relevant ads with publisher audiences based on content tags and wallet reputation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">x402 payouts</h3>
                <p className="text-text-secondary">
                  Publishers receive SOL rewards settled automatically through x402 micro-payments once metrics are verified.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand & Publisher tracks */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-8 space-y-6">
                <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  For brands
                </p>
                <h3 className="text-2xl font-semibold text-text">Launch a campaign in minutes</h3>
                <p className="text-text-secondary">
                  Connect a wallet, stake via x402, upload your creative, and go live once moderation + wallet checks pass. Every impression can be traced back to your signing key.
                </p>
                <ul className="space-y-3 text-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Signed x402 challenge assigns your role and enforces unique brand wallets.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                    Credit pools are funded in SOL; ad spend streams as impressions clear.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-info" />
                    Real-time creative dashboard mirrors the component library used in <code className="text-sm">/brand</code>.
                  </li>
                </ul>
                <Link to="/brand">
                  <Button className="mt-2 w-full md:w-auto">Go to Brand Console</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-6">
                <p className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                  For publishers
                </p>
                <h3 className="text-2xl font-semibold text-text">Monetize every slot, automatically</h3>
                <p className="text-text-secondary">
                  Register your domain, drop the SDK snippet, and let <code className="text-sm">adx402</code> call <code className="text-sm">/ad/&lt;wallet&gt;</code> using your tags and slot reputation. x402 handles payouts—no invoicing.
                </p>
                <ul className="space-y-3 text-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                    Domain proof + wallet challenge secures your publisher identity.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                    Each impression/click is hashed; once verified, x402 settles SOL directly to your wallet.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-warning" />
                    Adjustable fill rules: pin your own tags, aspect ratios, or fallback assets.
                  </li>
                </ul>
                <Link to="/publisher">
                  <Button variant="outline" className="mt-2 w-full md:w-auto">
                    Go to Publisher Console
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* x402 highlight */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-info/10 px-3 py-1 text-sm font-semibold text-info">
              Built for the Solana x402 Hackathon
            </p>
            <h2 className="text-3xl font-bold text-text">What x402 unlocks</h2>
            <p className="text-text-secondary">
              x402 brings HTTP status 402 (Payment Required) to Solana. We use it to verify wallets, require deposits, and stream rewards—all without centralized accounts.
            </p>
            <ul className="space-y-3 text-text">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                Real-time wallet verification with signed challenges.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                Programmatic settlement to publishers using x402 transfers.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                Configurable gating: require deposits before ads go live.
              </li>
            </ul>
          </div>
          <Card>
            <CardContent className="space-y-6 p-6">
              <h3 className="text-xl font-semibold text-text">Challenge → Serve → Settle</h3>
              <div className="space-y-4 text-sm text-text-secondary">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-text font-semibold">1. Wallet challenge</p>
                  <p className="mt-1">
                    <code className="text-sm text-text">adx402</code> requests a signed message to prove wallet ownership via x402 endpoints.
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-text font-semibold">2. Serve & track</p>
                  <p className="mt-1">
                    Ads render in isolated slots, impressions/clicks are hashed and queued for validation.
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-text font-semibold">3. Auto-settlement</p>
                  <p className="mt-1">
                    Verified metrics trigger x402 payouts in SOL with transaction hashes auditable on-chain.
                  </p>
                </div>
              </div>
              <Link to="/demo">
                <Button className="w-full">Explore x402 flow</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SDK Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Easy Integration
            </h2>
            <p className="text-xl text-text-secondary">
              Drop-in SDK for any website or app
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="bg-surface rounded-lg p-6 mb-6">
                <pre className="text-sm text-text overflow-x-auto">
                  <code>{`// Initialize
adx402.init({
  wallet: "your_publisher_wallet",
  tags: ["tech", "gaming"]
});

// Display ad
adx402.render("#ad-slot", {
  aspectRatio: "16x9"
});`}</code>
                </pre>
              </div>

              <div className="text-center">
                <Link to="/demo">
                  <Button variant="outline">
                    Try the SDK Demo →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-text-secondary">Active Publishers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">3,891</div>
              <div className="text-text-secondary">Ads Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">12.5 SOL</div>
              <div className="text-text-secondary">Total Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-text-secondary">
          <p>&copy; 2025 Adx402 Protocol. Built on Solana with love by Atelier x Psy Labs</p>
        </div>
      </footer>
    </div>
  );
}
