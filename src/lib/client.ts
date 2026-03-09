import { treaty } from '@elysiajs/eden'
import { app } from '../app/api/[[...slugs]]/route'

// Create treaty client for API calls
const baseUrl = typeof window !== 'undefined' 
  ? window.location.origin 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const client = treaty<typeof app>(baseUrl).api