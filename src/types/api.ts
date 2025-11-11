// Core Adx402 API Types based on SPECS.md

export type AspectRatio = '16x9' | '1x1' | '5x6' | '4x3' | 'auto'

export type AdStatus = 'pending' | 'approved' | 'rejected' | 'expired'

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged'

export interface Ad {
  id: string
  wallet: string // brand wallet
  url: string // target link
  aspectRatio: AspectRatio
  tags: string[]
  imageUrl: string // from Supabase Storage
  status: AdStatus
  moderationStatus: ModerationStatus
  createdAt: Date
  expiresAt: Date
  impressions: number
  clicks: number
  creatorWallet?: string // publisher wallet (when served)
}

export interface Publisher {
  wallet: string
  tags: string[]
  siteUrl?: string
  totalEarnings: number
  totalImpressions: number
  totalClicks: number
  slotsCount: number
  isActive: boolean
  registeredAt: Date
}

export interface Brand {
  wallet: string
  name?: string
  totalAds: number
  activeAds: number
  totalSpent: number
  isRegistered: boolean
  registeredAt?: Date
}

export interface AdMetrics {
  impressions: number
  clicks: number
  ctr: number // click-through rate
  earnings: number
  period: 'day' | 'week' | 'month'
}

// API Request/Response Types

export interface PublishAdRequest {
  wallet: string
  url: string
  aspectRatio: AspectRatio
  tags: string[]
  imageFile: File // for upload
}

export interface PublishAdResponse {
  success: boolean
  ad?: Ad
  paymentRequired?: boolean
  paymentAmount?: number // in SOL or x402 tokens
  error?: string
}

export interface GetAdResponse {
  ad: Ad | null
  fallback?: string
}

export interface TrackClickRequest {
  adId: string
  publisherWallet: string
  userAgent?: string
  referrer?: string
}

export interface TrackClickResponse {
  success: boolean
  earnings?: number
}

export interface PublisherProfileResponse {
  publisher: Publisher
  recentAds: Ad[]
  earnings: AdMetrics[]
}

export interface BrandProfileResponse {
  brand: Brand
  ads: Ad[]
  metrics: AdMetrics[]
}

// Wallet & Authentication Types

export interface WalletInfo {
  publicKey: string
  isConnected: boolean
  isVerified: boolean
  role: 'brand' | 'publisher' | null
  balance?: number
}

export interface SignatureChallenge {
  message: string
  signature?: string
  timestamp: number
}

// Form Types

export interface AdCreationForm {
  url: string
  aspectRatio: AspectRatio
  tags: string[]
  imageFile?: File
  previewUrl?: string
}

export interface PublisherSetupForm {
  tags: string[]
  siteUrl?: string
}

// UI State Types

export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message?: string
  code?: string
}

// SDK Types (for demo purposes)

export interface SDKConfig {
  wallet: string
  tags?: string[]
  aspectRatio?: AspectRatio
  fallback?: string
}

export interface SDKInstance {
  init: (config: SDKConfig) => void
  render: (selector: string, options?: Partial<SDKConfig>) => void
  destroy: () => void
}
