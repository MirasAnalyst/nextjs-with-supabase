"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Grid3X3, List, Search, Filter } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function ProductSearch() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t('nav.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
          className="px-3"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className="px-3"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Filter Button */}
      <Button variant="outline" size="sm" className="sm:hidden">
        <Filter className="w-4 h-4 mr-2" />
        {t('products.filters')}
      </Button>
    </div>
  )
}
