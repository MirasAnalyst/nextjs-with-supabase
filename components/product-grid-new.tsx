"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Heart, Star, ShoppingCart } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const products = [
  {
    id: 1,
    title: "It's Bedtime",
    subtitle: "Personalized Baby Book",
    price: 29.98,
    originalPrice: 54.98,
    image: "/api/placeholder/300/400",
    category: "Bedtime",
    rating: 4.9,
    reviews: 50,
    isNew: false,
    isSale: true,
    ageRange: "0-3 years",
    pages: 24,
    coverType: "Hardcover"
  },
  {
    id: 2,
    title: "The Little Princess",
    subtitle: "Personalized Fairy Tale",
    price: 34.98,
    originalPrice: 49.98,
    image: "/api/placeholder/300/400",
    category: "Fairy Tale",
    rating: 4.8,
    reviews: 32,
    isNew: true,
    isSale: false,
    ageRange: "3-7 years",
    pages: 28,
    coverType: "Hardcover"
  },
  {
    id: 3,
    title: "Dinosaur Discovery",
    subtitle: "Personalized Adventure Book",
    price: 39.98,
    originalPrice: 54.98,
    image: "/api/placeholder/300/400",
    category: "Adventure",
    rating: 4.7,
    reviews: 28,
    isNew: false,
    isSale: true,
    ageRange: "2-6 years",
    pages: 32,
    coverType: "Hardcover"
  },
  {
    id: 4,
    title: "Space Explorer",
    subtitle: "Personalized Sci-Fi Adventure",
    price: 44.98,
    originalPrice: 59.98,
    image: "/api/placeholder/300/400",
    category: "Adventure",
    rating: 4.9,
    reviews: 45,
    isNew: false,
    isSale: false,
    ageRange: "3-8 years",
    pages: 30,
    coverType: "Hardcover"
  },
  {
    id: 5,
    title: "The Brave Knight",
    subtitle: "Personalized Medieval Tale",
    price: 37.98,
    originalPrice: null,
    image: "/api/placeholder/300/400",
    category: "Adventure",
    rating: 4.6,
    reviews: 67,
    isNew: true,
    isSale: false,
    ageRange: "3-7 years",
    pages: 26,
    coverType: "Hardcover"
  },
  {
    id: 6,
    title: "Under the Sea",
    subtitle: "Personalized Ocean Adventure",
    price: 32.98,
    originalPrice: 47.98,
    image: "/api/placeholder/300/400",
    category: "Adventure",
    rating: 4.8,
    reviews: 41,
    isNew: false,
    isSale: true,
    ageRange: "2-6 years",
    pages: 28,
    coverType: "Hardcover"
  },
  {
    id: 7,
    title: "My First Day of School",
    subtitle: "Personalized School Story",
    price: 29.98,
    originalPrice: null,
    image: "/api/placeholder/300/400",
    category: "Educational",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isSale: false,
    ageRange: "3-6 years",
    pages: 24,
    coverType: "Hardcover"
  },
  {
    id: 8,
    title: "Christmas Magic",
    subtitle: "Personalized Holiday Book",
    price: 39.98,
    originalPrice: 54.98,
    image: "/api/placeholder/300/400",
    category: "Holiday",
    rating: 4.9,
    reviews: 156,
    isNew: false,
    isSale: true,
    ageRange: "2-8 years",
    pages: 32,
    coverType: "Hardcover"
  },
  {
    id: 9,
    title: "Birthday Adventure",
    subtitle: "Personalized Birthday Book",
    price: 34.98,
    originalPrice: 49.98,
    image: "/api/placeholder/300/400",
    category: "Birthday",
    rating: 4.8,
    reviews: 73,
    isNew: false,
    isSale: false,
    ageRange: "1-6 years",
    pages: 26,
    coverType: "Hardcover"
  },
  {
    id: 10,
    title: "Farm Animal Friends",
    subtitle: "Personalized Animal Book",
    price: 31.98,
    originalPrice: 46.98,
    image: "/api/placeholder/300/400",
    category: "Animals",
    rating: 4.6,
    reviews: 52,
    isNew: false,
    isSale: true,
    ageRange: "1-5 years",
    pages: 22,
    coverType: "Hardcover"
  },
  {
    id: 11,
    title: "Superhero Academy",
    subtitle: "Personalized Superhero Book",
    price: 42.98,
    originalPrice: null,
    image: "/api/placeholder/300/400",
    category: "Adventure",
    rating: 4.7,
    reviews: 38,
    isNew: true,
    isSale: false,
    ageRange: "3-8 years",
    pages: 30,
    coverType: "Hardcover"
  },
  {
    id: 12,
    title: "Easter Bunny's Garden",
    subtitle: "Personalized Spring Book",
    price: 33.98,
    originalPrice: 48.98,
    image: "/api/placeholder/300/400",
    category: "Holiday",
    rating: 4.5,
    reviews: 29,
    isNew: false,
    isSale: true,
    ageRange: "1-6 years",
    pages: 24,
    coverType: "Hardcover"
  }
]

export function ProductGrid() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('featured.showing')} {products.length} {t('featured.products')}
          </h1>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t('products.sortBy')}:</span>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="featured">{t('products.featured')}</option>
            <option value="price-low">{t('products.priceLowToHigh')}</option>
            <option value="price-high">{t('products.priceHighToLow')}</option>
            <option value="newest">{t('products.newest')}</option>
            <option value="rating">{t('products.bestRating')}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="p-0">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-blue-500" />
                </div>
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600">{t('featured.new')}</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-red-500 hover:bg-red-600">{t('featured.sale')}</Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <Badge variant="secondary" className="text-xs mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                  {product.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mb-3">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={`/products/${product.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('products.addToCart')}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/products/${product.id}`}>
                    {t('products.viewDetails')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button variant="outline" size="sm" disabled>
          {t('products.previous')}
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
        </div>
        <Button variant="outline" size="sm">
          {t('products.next')}
        </Button>
      </div>
    </div>
  )
}
