"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PersonalizationPayload } from '@/lib/types/ecommerce'
import { usePersonalization } from '@/lib/services/personalization'

const bookOptions = [
  { id: '1', title: "It's Bedtime", description: "A soothing bedtime story" },
  { id: '2', title: "Little Princess Adventure", description: "A royal fairy tale" },
  { id: '3', title: "Dinosaur Explorer", description: "A prehistoric adventure" },
  { id: '4', title: "Space Adventure", description: "A cosmic journey" },
  { id: '5', title: "Ocean Adventure", description: "An underwater tale" },
]

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

export default function TestPreviewPage() {
  const [selectedBook, setSelectedBook] = useState('1')
  const [childName, setChildName] = useState('Emma')
  const [coverColor, setCoverColor] = useState('blue')
  const [dedication, setDedication] = useState('Made with love for our little star')

  const { generatePreview, isGenerating, error, preview } = usePersonalization()

  const handleGeneratePreview = async () => {
    console.log('🚀 Generate Preview button clicked!')
    
    const payload: PersonalizationPayload = {
      childName,
      coverColor: coverColor as 'blue' | 'pink' | 'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'teal',
      dedication,
      locale: 'en-US',
      previewVersion: 'v1',
      artTheme: selectedBook,
    }

    console.log('📋 Payload:', payload)

    try {
      const result = await generatePreview(payload)
      console.log('✅ Preview generated successfully:', result)
    } catch (err) {
      console.error('❌ Preview generation failed:', err)
    }
  }

  const selectedBookInfo = bookOptions.find(book => book.id === selectedBook)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Book Preview System</h1>
          <p className="text-xl text-gray-600">Test personalized children&apos;s books with 5 pages each</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Personalization Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Book Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">📖 Choose a Book</Label>
                <div className="grid gap-2">
                  {bookOptions.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => setSelectedBook(book.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedBook === book.id
                          ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-gray-600">{book.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Child Name */}
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-lg font-medium">👶 Child&apos;s Name</Label>
                <Input
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Enter child&apos;s name"
                  className="text-lg"
                />
              </div>

              {/* Cover Color */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">🎨 Cover Color</Label>
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
                      <div className={`w-full h-8 rounded ${color.preview} mb-1`} />
                      <div className="text-xs">{color.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dedication */}
              <div className="space-y-2">
                <Label htmlFor="dedication" className="text-lg font-medium">💝 Dedication (Optional)</Label>
                <textarea
                  id="dedication"
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="Enter a special message..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
                <div className="text-xs text-gray-500">{dedication.length}/500 characters</div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGeneratePreview}
                disabled={!childName || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              >
                {isGenerating ? '🔄 Generating Preview...' : '✨ Generate Book Preview'}
              </Button>

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                  ❌ {error}
                </div>
              )}

              {/* Preview Info */}
              {preview && (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <div className="text-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">✅</span>
                      <span className="font-semibold">Preview Generated!</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>📚 <strong>Book:</strong> {selectedBookInfo?.title}</div>
                      <div>👶 <strong>Child:</strong> {childName}</div>
                      <div>🎨 <strong>Color:</strong> {coverColors.find(c => c.value === coverColor)?.label}</div>
                      <div>📄 <strong>Pages:</strong> {preview.pages.length}</div>
                      <div>🆔 <strong>Asset ID:</strong> {preview.assetId}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👀 Book Preview
                {selectedBookInfo && (
                  <span className="text-lg font-normal text-gray-600">
                    - {selectedBookInfo.title}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {preview ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📊 Showing <strong>{preview.pages.length}</strong> pages</span>
                    <span>|</span>
                    <span>⏱️ Generated in real-time</span>
                  </div>
                  
                  {/* Page Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {preview.pages.map((page) => (
                      <div key={page.pageNumber} className="text-center group">
                        <div className="relative">
                          <img
                            src={page.imageUrl}
                            alt={`Page ${page.pageNumber}`}
                            className="w-full h-24 object-cover rounded border shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded transition-colors" />
                        </div>
                        <div className="text-xs mt-1 font-medium">Page {page.pageNumber}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      📱 View Full Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      📥 Download PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <div className="text-gray-500 mb-2">
                    <strong>Ready to create magic?</strong>
                  </div>
                  <div className="text-sm text-gray-400">
                    Select a book, enter a child&apos;s name, and generate your preview
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Book Templates Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📖 Available Book Templates (5 Pages Each)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookOptions.map((book) => (
                <div key={book.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                  <div className="text-xs text-gray-500">5 pages • Personalized content</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
