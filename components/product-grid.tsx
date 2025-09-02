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
    title: "First Birthday Adventure",
    subtitle: "Personalized Birthday Book",
    price: 34.98,
    originalPrice: 49.98,
    image: "/api/placeholder/300/400",
    category: "Birthday",
    rating: 4.8,
    reviews: 32,
    isNew: true,
    isSale: false,
    ageRange: "1-5 years",
    pages: 28,
    coverType: "Hardcover"
  },
  {
    id: 3,
    title: "Dinosaur Explorer",
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
    title: "Princess Dreams",
    subtitle: "Personalized Fairy Tale",
    price: 44.98,
    originalPrice: 59.98,
    image: "/api/placeholder/300/400",
    category: "Fairy Tale",
    rating: 4.9,
    reviews: 45,
    isNew: false,
    isSale: false,
    ageRange: "3-7 years",
    pages: 30,
    coverType: "Hardcover"
  },
  {
    id: 5,
    title: "Monster Truck Rally",
    subtitle: "Personalized Action Book",
    price: 39.98,
    originalPrice: 54.98,
    image: "/api/placeholder/300/400",
    category: "Action",
    rating: 4.6,
    reviews: 38,
    isNew: false,
    isSale: true,
    ageRange: "2-6 years",
    pages: 26,
    coverType: "Hardcover"
  },
  {
    id: 6,
    title: "Unicorn Magic",
    subtitle: "Personalized Fantasy Book",
    price: 44.98,
    originalPrice: 59.98,
    image: "/api/placeholder/300/400",
    category: "Fantasy",
    rating: 4.8,
    reviews: 42,
    isNew: false,
    isSale: false,
    ageRange: "3-7 years",
    pages: 28,
    coverType: "Hardcover"
  },
  {
    id: 7,
    title: "Christmas Wonderland",
    subtitle: "Personalized Holiday Book",
    price: 49.98,
    originalPrice: 64.98,
    image: "/api/placeholder/300/400",
    category: "Holiday",
    rating: 4.9,
    reviews: 55,
    isNew: false,
    isSale: true,
    ageRange: "2-8 years",
    pages: 34,
    coverType: "Hardcover"
  },
  {
    id: 8,
    title: "Animal Friends",
    subtitle: "Personalized Nature Book",
    price: 39.98,
    originalPrice: 54.98,
    image: "/api/placeholder/300/400",
    category: "Nature",
    rating: 4.7,
    reviews: 35,
    isNew: false,
    isSale: false,
    ageRange: "1-5 years",
    pages: 26,
    coverType: "Hardcover"
  }
]

export function ProductGrid() {
  const { t } = useLanguage()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {t('featured.showing')} {products.length} {t('featured.products')}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t('products.sortBy')}:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>{t('products.featured')}</option>
            <option>{t('products.priceLowToHigh')}</option>
            <option>{t('products.priceHighToLow')}</option>
            <option>{t('products.newest')}</option>
            <option>{t('products.bestRating')}</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
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
                <p className="text-sm text-gray-600 mb-2">
                  {product.subtitle}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span>{product.ageRange}</span>
                  <span>{product.pages} pages</span>
                  <span>{product.coverType}</span>
                </div>
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
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={`/products/${product.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('products.addToCart')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
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
      <div className="flex items-center justify-center mt-12">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">{t('products.previous')}</Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">{t('products.next')}</Button>
        </div>
      </div>
    </div>
  )
}
