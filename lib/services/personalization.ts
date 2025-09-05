// Personalization Service for Real-time Book Preview
import { PersonalizationPayload, PreviewResponse } from '@/lib/types/ecommerce'
import { useState } from 'react'

export class PersonalizationService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    // Use local API routes instead of external service
    this.baseUrl = ''
    this.apiKey = process.env.PERSONALIZATION_API_KEY || ''
  }

  /**
   * Generate real-time preview of personalized book
   * Target: ≤3s LCP for preview generation
   */
  async generatePreview(payload: PersonalizationPayload): Promise<PreviewResponse> {
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          timestamp: Date.now(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Preview generation failed: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      
      // Log performance metrics
      const duration = Date.now() - startTime
      if (duration > 3000) {
        console.warn(`Preview generation exceeded 3s target: ${duration}ms`)
      }

      return data
    } catch (error) {
      console.error('Preview generation error:', error)
      throw new Error('Failed to generate book preview')
    }
  }

  /**
   * Create print-ready PDF asset for fulfillment
   */
  async createPrintAsset(payload: PersonalizationPayload): Promise<string> {
    try {
      const response = await fetch('/api/order-asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Asset creation failed: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      return data.assetId
    } catch (error) {
      console.error('Asset creation error:', error)
      throw new Error('Failed to create print asset')
    }
  }

  /**
   * Validate personalization inputs
   */
  validatePersonalization(payload: PersonalizationPayload): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Child name validation
    if (!payload.childName || payload.childName.trim().length === 0) {
      errors.push('Child name is required')
    } else if (payload.childName.length > 50) {
      errors.push('Child name must be 50 characters or less')
    } else if (!/^[a-zA-Z\s\-']+$/.test(payload.childName)) {
      errors.push('Child name can only contain letters, spaces, hyphens, and apostrophes')
    }

    // Dedication validation
    if (payload.dedication && payload.dedication.length > 500) {
      errors.push('Dedication must be 500 characters or less')
    }

    // Profanity filter (basic implementation)
    const profanityWords = ['bad', 'inappropriate'] // Add comprehensive list
    const textToCheck = `${payload.childName} ${payload.dedication || ''}`.toLowerCase()
    
    for (const word of profanityWords) {
      if (textToCheck.includes(word)) {
        errors.push('Content contains inappropriate language')
        break
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Get character count for dedication with live updates
   */
  getCharacterCount(text: string): { current: number; max: number; remaining: number } {
    const max = 500
    const current = text.length
    const remaining = Math.max(0, max - current)
    
    return { current, max, remaining }
  }

  /**
   * Generate preview cache key for optimization
   */
  generateCacheKey(payload: PersonalizationPayload): string {
    const key = `${payload.artTheme}-${payload.childName}-${payload.coverColor}-${payload.locale}`
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '')
  }
}

// Singleton instance
export const personalizationService = new PersonalizationService()

// React hook for personalization
export function usePersonalization() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [preview, setPreview] = useState<PreviewResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generatePreview = async (payload: PersonalizationPayload) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const result = await personalizationService.generatePreview(payload)
      setPreview(result)
      return result
    } catch (err) {
      console.error('Preview generation error:', err)
      setError(err instanceof Error ? err.message : 'Preview generation failed')
      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  const validateInputs = (payload: PersonalizationPayload) => {
    return personalizationService.validatePersonalization(payload)
  }

  const getCharacterCount = (text: string) => {
    return personalizationService.getCharacterCount(text)
  }

  return {
    generatePreview,
    validateInputs,
    getCharacterCount,
    isGenerating,
    preview,
    error,
  }
}
