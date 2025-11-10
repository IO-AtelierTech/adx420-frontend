import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import ContentPage from './pages/ContentPage'
import MainPage from './pages/MainPage'
import { BrandDashboard } from './pages/BrandDashboard'
import { PublisherDashboard } from './pages/PublisherDashboard'
import { SdkDemoPage } from './pages/SdkDemoPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/content', element: <ContentPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/brand', element: <BrandDashboard /> },
  { path: '/publisher', element: <PublisherDashboard /> },
  { path: '/demo', element: <SdkDemoPage /> }
])
