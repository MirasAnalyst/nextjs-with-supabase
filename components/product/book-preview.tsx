"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download,
  Share2,
  BookOpen,
  Loader2
} from 'lucide-react'
import { PreviewResponse } from '@/lib/types/ecommerce'
import { motion, AnimatePresence } from 'framer-motion'

interface BookPreviewProps {
  preview: PreviewResponse | null
  isGenerating: boolean
  onClose: () => void
}

export function BookPreview({ preview, isGenerating, onClose }: BookPreviewProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Reset page when preview changes
  useEffect(() => {
    setCurrentPage(0)
  }, [preview])

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Generating Your Book Preview</h3>
            <p className="text-gray-600">
              Creating your personalized book pages... This may take a few moments.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!preview) return null

  const totalPages = preview.pages.length
  const currentPageData = preview.pages[currentPage]

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setIsZoomed(false)
  }

  const downloadPreview = () => {
    // Implementation for downloading preview as PDF
    console.log('Download preview')
  }

  const sharePreview = () => {
    // Implementation for sharing preview
    console.log('Share preview')
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
      isFullscreen ? 'p-0' : 'p-4'
    }`}>
      <Card className={`bg-white shadow-2xl ${
        isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'w-full max-w-4xl max-h-[90vh]'
      }`}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold">Book Preview</h3>
                <p className="text-sm text-gray-600">
                  Page {currentPage + 1} of {totalPages}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={sharePreview}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadPreview}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
            <div className="relative">
              {/* Page Navigation */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Page Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`relative ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  } transition-transform duration-300`}
                >
                  <img
                    src={currentPageData.imageUrl}
                    alt={`Page ${currentPage + 1}`}
                    className={`max-w-full max-h-full object-contain shadow-lg rounded ${
                      isFullscreen ? 'max-h-[80vh]' : 'max-h-[60vh]'
                    }`}
                    style={{
                      aspectRatio: '11/8.5', // Book dimensions
                    }}
                  />
                  
                  {/* Page Number Badge */}
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                    {currentPage + 1}
                  </Badge>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between">
              {/* Page Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-md">
                {preview.pages.slice(0, 10).map((page, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`flex-shrink-0 w-12 h-8 rounded border-2 transition-all ${
                      currentPage === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={page.thumbnailUrl}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
                {totalPages > 10 && (
                  <span className="text-sm text-gray-500 px-2">
                    +{totalPages - 10} more
                  </span>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(0)}
                  disabled={currentPage === 0}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  {currentPage + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(totalPages - 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  Last
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(0)
                    setIsZoomed(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
