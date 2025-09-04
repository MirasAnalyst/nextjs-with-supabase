"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Heart, Star, ShoppingCart } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import BookPreviewButton from '@/components/book-preview-button'

const featuredProducts = [
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
    isSale: true
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
    isSale: false
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
    isSale: true
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
    isSale: false
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
    isSale: false
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
    isSale: true
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
    isSale: false
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
    isSale: true
  }
]

export function FeaturedProducts() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
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
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <BookPreviewButton 
                    bookId={product.id.toString()} 
                    bookTitle={product.title}
                    variant="outline"
                    size="sm"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href={`/products/${product.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t('featured.addToCart')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="px-8 py-3">
            <Link href="/products">{t('featured.viewAllProducts')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
