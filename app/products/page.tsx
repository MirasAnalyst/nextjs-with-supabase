"use client"

import { Suspense } from 'react'
import { ProductGrid } from '@/components/product-grid'
import { ProductFilters } from '@/components/product-filters'
import { ProductSearch } from '@/components/product-search'
import { useLanguage } from '@/lib/i18n/language-context'

export default function ProductsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('products.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('products.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <ProductSearch />
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
