import { Ad, Publisher, Brand, AdMetrics } from '../types/api'

// Mock Ads Data
export const mockAds: Ad[] = [
  {
    id: 'ad-1',
    wallet: '8xRtD1z7sK3E9pN2mL6bF4hG7jK9cV5xW2yT8aQ3',
    url: 'https://example.com/product',
    aspectRatio: '16x9',
    tags: ['tech', 'gaming', 'software'],
    imageUrl: '/api/placeholder/640/360',
    status: 'approved',
    moderationStatus: 'approved',
    createdAt: new Date('2024-11-01'),
    expiresAt: new Date('2024-11-08'),
    impressions: 15420,
    clicks: 892,
    creatorWallet: '9ySuE2z8sL4F0pM3nL7cG5jH8kV6xB3yR9aP4'
  },
  {
    id: 'ad-2',
    wallet: '7wQsC0y6rJ2D8nM1kH4fE9gT5vB7xL3zP8aR6',
    url: 'https://brandstore.com/collection',
    aspectRatio: '1x1',
    tags: ['fashion', 'lifestyle', 'shopping'],
    imageUrl: '/api/placeholder/400/400',
    status: 'approved',
    moderationStatus: 'approved',
    createdAt: new Date('2024-11-02'),
    expiresAt: new Date('2024-11-09'),
    impressions: 8750,
    clicks: 456,
    creatorWallet: '6vPrB9x4sK1E7mN0jG3fD8hT2vL5zQ7aR1'
  },
  {
    id: 'ad-3',
    wallet: '5uOrA8w3rH9C6lK4fE1gS7vB0xM2zP9aQ8',
    url: 'https://cryptoexchange.com/trade',
    aspectRatio: '5x6',
    tags: ['crypto', 'finance', 'trading'],
    imageUrl: '/api/placeholder/250/300',
    status: 'pending',
    moderationStatus: 'pending',
    createdAt: new Date('2024-11-08'),
    expiresAt: new Date('2024-11-15'),
    impressions: 0,
    clicks: 0
  },
  {
    id: 'ad-4',
    wallet: '4tNqZ7v2rG8B5kJ3fD0hR6cV9xL1zP7aS4',
    url: 'https://fitnessapp.com/premium',
    aspectRatio: '16x9',
    tags: ['fitness', 'health', 'mobile'],
    imageUrl: '/api/placeholder/640/360',
    status: 'rejected',
    moderationStatus: 'rejected',
    createdAt: new Date('2024-11-05'),
    expiresAt: new Date('2024-11-12'),
    impressions: 0,
    clicks: 0
  }
]

// Mock Publishers Data
export const mockPublishers: Publisher[] = [
  {
    wallet: '9ySuE2z8sL4F0pM3nL7cG5jH8kV6xB3yR9aP4',
    tags: ['tech', 'blog', 'tutorial'],
    siteUrl: 'https://techblog.example.com',
    totalEarnings: 2.45,
    totalImpressions: 45670,
    totalClicks: 2341,
    slotsCount: 3,
    isActive: true,
    registeredAt: new Date('2024-10-15')
  },
  {
    wallet: '6vPrB9x4sK1E7mN0jG3fD8hT2vL5zQ7aR1',
    tags: ['fashion', 'lifestyle', 'ecommerce'],
    siteUrl: 'https://fashionstore.example.com',
    totalEarnings: 1.87,
    totalImpressions: 32150,
    totalClicks: 1654,
    slotsCount: 2,
    isActive: true,
    registeredAt: new Date('2024-10-20')
  },
  {
    wallet: '3sLmZ6w1qF7A4jH2dE9gR5cB8xK0zP6aT3',
    tags: ['gaming', 'reviews', 'entertainment'],
    siteUrl: 'https://gamereviews.example.com',
    totalEarnings: 3.12,
    totalImpressions: 67890,
    totalClicks: 3456,
    slotsCount: 4,
    isActive: true,
    registeredAt: new Date('2024-09-30')
  },
  {
    wallet: '2rKjY5v0pD6S3hF1eG8bQ4cA7xJ9zO5aU2',
    tags: ['crypto', 'news', 'analysis'],
    siteUrl: 'https://cryptonews.example.com',
    totalEarnings: 4.23,
    totalImpressions: 89230,
    totalClicks: 4567,
    slotsCount: 5,
    isActive: true,
    registeredAt: new Date('2024-10-01')
  }
]

// Mock Brands Data
export const mockBrands: Brand[] = [
  {
    wallet: '8xRtD1z7sK3E9pN2mL6bF4hG7jK9cV5xW2yT8aQ3',
    name: 'TechCorp Solutions',
    totalAds: 12,
    activeAds: 8,
    totalSpent: 15.67,
    isRegistered: true,
    registeredAt: new Date('2024-09-15')
  },
  {
    wallet: '7wQsC0y6rJ2D8nM1kH4fE9gT5vB7xL3zP8aR6',
    name: 'Fashion Forward',
    totalAds: 6,
    activeAds: 4,
    totalSpent: 8.92,
    isRegistered: true,
    registeredAt: new Date('2024-10-01')
  },
  {
    wallet: '5uOrA8w3rH9C6lK4fE1gS7vB0xM2zP9aQ8',
    name: 'CryptoTrade Pro',
    totalAds: 3,
    activeAds: 1,
    totalSpent: 4.15,
    isRegistered: true,
    registeredAt: new Date('2024-10-10')
  },
  {
    wallet: '4tNqZ7v2rG8B5kJ3fD0hR6cV9xL1zP7aS4',
    name: 'FitLife App',
    totalAds: 2,
    activeAds: 0,
    totalSpent: 2.3,
    isRegistered: true,
    registeredAt: new Date('2024-10-05')
  }
]

// Mock Metrics Data
export const mockMetrics: AdMetrics[] = [
  {
    impressions: 15420,
    clicks: 892,
    ctr: 5.78,
    earnings: 2.45,
    period: 'week'
  },
  {
    impressions: 8750,
    clicks: 456,
    ctr: 5.21,
    earnings: 1.87,
    period: 'week'
  },
  {
    impressions: 67890,
    clicks: 3456,
    ctr: 5.09,
    earnings: 3.12,
    period: 'week'
  },
  {
    impressions: 89230,
    clicks: 4567,
    ctr: 5.12,
    earnings: 4.23,
    period: 'week'
  }
]

// Utility functions for mock data
export function getMockAdById(id: string): Ad | undefined {
  return mockAds.find((ad) => ad.id === id)
}

export function getMockAdsByWallet(wallet: string): Ad[] {
  return mockAds.filter((ad) => ad.wallet === wallet)
}

export function getMockPublisherByWallet(wallet: string): Publisher | undefined {
  return mockPublishers.find((publisher) => publisher.wallet === wallet)
}

export function getMockBrandByWallet(wallet: string): Brand | undefined {
  return mockBrands.find((brand) => brand.wallet === wallet)
}

export function getMockAdsByStatus(status: Ad['status']): Ad[] {
  return mockAds.filter((ad) => ad.status === status)
}

export function getMockAdsByModerationStatus(status: Ad['moderationStatus']): Ad[] {
  return mockAds.filter((ad) => ad.moderationStatus === status)
}

// Generate time-series data for charts
export function generateMockTimeSeries(
  days: number = 7
): Array<{ date: string; impressions: number; clicks: number; earnings: number }> {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split('T')[0],
      impressions: Math.floor(Math.random() * 1000) + 500,
      clicks: Math.floor(Math.random() * 50) + 10,
      earnings: Math.round((Math.random() * 0.5 + 0.1) * 100) / 100
    })
  }

  return data
}
