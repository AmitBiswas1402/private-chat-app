import { treaty } from '@elysiajs/eden'
import { app } from '../app/api/[[...slugs]]/route'

// Create treaty client for API calls
export const api = treaty<typeof app>('http://localhost:3000')