import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import Unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash'],
        },
      },
    }
  },
  plugins: [
    react(),
    Unfonts({
      google: {
        families: [
          {
            name: 'Poppins',
            styles: 'wght@400;700'
          },
          { name: 'Orbitron' },
          { name: 'Space Grotesk' },
          { name: 'Oswald' },
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      },
      includeAssets: [],
      manifest: {
        name: 'DanEscher98 React-site',
        theme_color: '#8F00FF',
        icons: [
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
    visualizer({ open: true }) as PluginOption
  ]
})
