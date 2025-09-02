import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Heart, 
  Star, 
  ShoppingCart, 
  Truck, 
  Shield, 
  CheckCircle,
  Share2
} from 'lucide-react'

// Mock product data - in a real app, this would come from your database
const products = {
  1: {
    id: 1,
    title: "It's Bedtime",
    subtitle: "Personalized Baby Book",
    price: 29.98,
    originalPrice: 54.98,
    description: "Create a soothing bedtime routine with 'It's Bedtime' Personalized Baby Book, designed to guide your little adventurers into dreamland with stories that feature them as the main character. This personalized book not only makes bedtime exciting but also fosters a love for reading, making it a perfect addition to your nightly ritual.",
    features: [
      "Personalized with your child's name throughout the story",
      "Beautiful, calming illustrations perfect for bedtime",
      "High-quality hardcover binding",
      "24 pages of engaging content",
      "Suitable for ages 0-3 years",
      "Made with love in the USA"
    ],
    specifications: {
      pages: 24,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "0-3 years",
      paperQuality: "100% digital recycled paper",
      binding: "Perfect bound"
    },
    category: "Bedtime",
    rating: 4.9,
    reviews: 50,
    isNew: false,
    isSale: true,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id as keyof typeof products]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-32 h-32 text-blue-500" />
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80">
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80">
                <BookOpen className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
                )}
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {product.subtitle}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.isSale && (
                <Badge className="bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                {product.shipping}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Free shipping over $65</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Made in USA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
