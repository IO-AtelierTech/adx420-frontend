import axios from 'axios'
import { withPaymentInterceptor, type Signer } from 'x402-axios'

export interface UploadBrandAdParams {
  signer: Signer
  wallet: string
  file: File
  targetUrl: string
  tags?: string[]
}

export interface UploadBrandAdResponse {
  message: string
  fileName: string
  imageUrl: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export async function uploadBrandAd({
  signer,
  wallet,
  file,
  targetUrl,
  tags = []
}: UploadBrandAdParams) {
  const client = withPaymentInterceptor(
    axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true
    }),
    signer
  )

  const formData = new FormData()
  formData.append('file', file)

  if (targetUrl) {
    formData.append('targetUrl', targetUrl)
  }

  if (tags.length > 0) {
    formData.append('tags', tags.join(','))
  }

  return client.post<UploadBrandAdResponse>('/brand/ad', formData, {
    params: { wallet },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
