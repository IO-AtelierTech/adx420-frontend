import axios from 'axios'
import { withPaymentInterceptor, type Signer } from 'x402-axios'

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

// Publisher registration interfaces
export interface RegisterPublisherParams {
  signer: Signer
  walletAddress: string
  domain: string
  tags: string[]
}

export interface RegisterPublisherResponse {
  message: string
  publisherId?: string
  success: boolean
}

// Slot creation interfaces
export interface CreateSlotParams {
  signer: Signer
  wallet: string
  slotId: string
  tags: string[]
  aspectRatios: string[]
}

export interface CreateSlotResponse {
  message: string
  slotId?: string
  success: boolean
}

/**
 * Register a new publisher
 */
export async function registerPublisher({
  signer,
  walletAddress,
  domain,
  tags
}: RegisterPublisherParams): Promise<RegisterPublisherResponse> {
  const client = withPaymentInterceptor(
    axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true
    }),
    signer
  )

  try {
    const response = await client.post<RegisterPublisherResponse>('/publisher/create', {
      walletAddress,
      domain,
      tags
    })
    
    return response.data
  } catch (error) {
    console.error('Error registering publisher:', error)
    throw error
  }
}

/**
 * Create a new slot for a publisher
 */
export async function createSlot({
  signer,
  wallet,
  slotId,
  tags,
  aspectRatios
}: CreateSlotParams): Promise<CreateSlotResponse> {
  const client = withPaymentInterceptor(
    axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true
    }),
    signer
  )

  try {
    const response = await client.post<CreateSlotResponse>('/publisher/create-slot', {
      wallet,
      slotId,
      tags,
      aspectRatios
    })
    
    return response.data
  } catch (error) {
    console.error('Error creating slot:', error)
    throw error
  }
}