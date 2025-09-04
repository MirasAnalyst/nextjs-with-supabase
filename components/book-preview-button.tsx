"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PersonalizationPayload, PreviewResponse } from '@/lib/types/ecommerce'
import { usePersonalization } from '@/lib/services/personalization'
import { useLanguage } from '@/lib/i18n/language-context'

interface BookPreviewButtonProps {
  bookId: string
  bookTitle: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'secondary'
}

const coverColors = [
  { value: 'blue', label: 'Ocean Blue', preview: 'bg-blue-500' },
  { value: 'pink', label: 'Rose Pink', preview: 'bg-pink-500' },
  { value: 'purple', label: 'Royal Purple', preview: 'bg-purple-500' },
  { value: 'green', label: 'Forest Green', preview: 'bg-green-500' },
  { value: 'yellow', label: 'Sunshine Yellow', preview: 'bg-yellow-500' },
  { value: 'red', label: 'Cherry Red', preview: 'bg-red-500' },
  { value: 'orange', label: 'Sunset Orange', preview: 'bg-orange-500' },
  { value: 'teal', label: 'Mint Teal', preview: 'bg-teal-500' },
]

export default function BookPreviewButton({ 
  bookId, 
  bookTitle, 
  size = 'md', 
  variant = 'default' 
}: BookPreviewButtonProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [childName, setChildName] = useState('')
  const [coverColor, setCoverColor] = useState('blue')
  const [dedication, setDedication] = useState('')
  
  const { generatePreview, isGenerating, error, preview } = usePersonalization()

  const handleGeneratePreview = async () => {
    if (!childName.trim()) {
      alert('Please enter a child\'s name')
      return
    }

    console.log('🎯 Starting preview generation...')
    console.log('📋 Book ID:', bookId)
    console.log('👶 Child Name:', childName.trim())
    console.log('🎨 Cover Color:', coverColor)

    const payload: PersonalizationPayload = {
      childName: childName.trim(),
      coverColor: coverColor as any,
      dedication: dedication.trim(),
      locale: 'en-US',
      previewVersion: 'v1',
      artTheme: bookId,
    }

    console.log('📦 Full payload:', payload)

    try {
      const result = await generatePreview(payload)
      console.log('✅ Preview generated successfully:', result)
    } catch (err) {
      console.error('❌ Preview generation failed:', err)
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      })
    }
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-10 px-6 text-base'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          className={sizeClasses[size]}
        >
          👀 Preview Book
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            📚 Preview: {bookTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personalization Form */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✨ Personalize Your Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Child Name */}
                <div className="space-y-2">
                  <Label htmlFor="childName">👶 Child's Name *</Label>
                  <Input
                    id="childName"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Enter child's name"
                    className="text-base"
                  />
                </div>

                {/* Cover Color */}
                <div className="space-y-3">
                  <Label>🎨 Cover Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {coverColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setCoverColor(color.value)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          coverColor === color.value
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-6 rounded ${color.preview} mb-1`}></div>
                        <div className="text-xs">{color.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dedication */}
                <div className="space-y-2">
                  <Label htmlFor="dedication">💝 Dedication (Optional)</Label>
                  <textarea
                    id="dedication"
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    placeholder="Enter a special message..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-500">
                    {dedication.length}/500 characters
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGeneratePreview}
                  disabled={isGenerating || !childName.trim()}
                  className="w-full"
                >
                  {isGenerating ? '🔄 Generating Preview...' : '✨ Generate Preview'}
                </Button>

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                    <div className="font-semibold mb-1">❌ Preview Generation Failed</div>
                    <div className="text-sm">{error}</div>
                    <div className="text-xs mt-2 opacity-75">
                      Check the browser console for more details.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Display */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>👀 Book Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {preview ? (
                  <div className="space-y-4">
                    {/* Success Message */}
                    <div className="p-4 bg-green-50 border border-green-200 rounded">
                      <div className="text-green-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">✅</span>
                          <span className="font-semibold">Preview Generated!</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>👶 <strong>Child:</strong> {childName}</div>
                          <div>🎨 <strong>Color:</strong> {coverColors.find(c => c.value === coverColor)?.label}</div>
                          <div>📄 <strong>Pages:</strong> {preview.pages.length}</div>
                        </div>
                      </div>
                    </div>

                    {/* Page Thumbnails */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">📖 Preview Pages</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {preview.pages.map((page) => (
                          <div key={page.pageNumber} className="space-y-2">
                            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={page.thumbnailUrl}
                                alt={`Page ${page.pageNumber}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="text-center text-xs text-gray-600">
                              Page {page.pageNumber}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Size Preview */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">🔍 Full Page View</h4>
                      <div className="aspect-[11/8.5] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={preview.pages[0]?.imageUrl}
                          alt="Cover page"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        Showing cover page • Click thumbnails above to view other pages
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <div className="text-gray-500 mb-2">
                      <strong>Ready to see the magic?</strong>
                    </div>
                    <div className="text-sm text-gray-400">
                      Enter a child's name and generate your personalized preview
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
