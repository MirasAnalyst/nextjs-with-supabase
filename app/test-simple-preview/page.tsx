"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PersonalizationPayload } from '@/lib/types/ecommerce'
import { usePersonalization } from '@/lib/services/personalization'

export default function TestSimplePreview() {
  const [childName, setChildName] = useState('Emma')
  const { generatePreview, isGenerating, error, preview } = usePersonalization()

  const handleTest = async () => {
    console.log('🧪 Testing simple preview generation...')
    
    const payload: PersonalizationPayload = {
      childName,
      coverColor: 'blue',
      dedication: 'Test message',
      locale: 'en-US',
      previewVersion: 'v1',
      artTheme: '1'
    }

    console.log('📦 Payload:', payload)

    try {
      const result = await generatePreview(payload)
      console.log('✅ Success:', result)
    } catch (err) {
      console.error('❌ Failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Simple Preview Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Child's Name:</label>
            <Input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          
          <Button
            onClick={handleTest}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? '🔄 Testing...' : '🧪 Test Preview Generation'}
          </Button>
          
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {preview && (
            <div className="p-4 bg-green-100 text-green-700 rounded">
              <strong>Success!</strong> Generated {preview.pages.length} pages
              <div className="mt-2">
                <strong>Asset ID:</strong> {preview.assetId}
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            <p>This page tests the preview generation without the modal.</p>
            <p>Check the browser console for detailed logs.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
