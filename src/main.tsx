import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { ThemeProvider, WalletProvider } from './contexts'
import { SolanaProviders } from './providers/SolanaProviders'
import './index.css'
import 'unfonts.css'
import '@solana/wallet-adapter-react-ui/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SolanaProviders>
      <ThemeProvider>
        <WalletProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </WalletProvider>
      </ThemeProvider>
    </SolanaProviders>
  </React.StrictMode>
)
