"use client"

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
import BookPreviewButton from '@/components/book-preview-button'

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
  },
  2: {
    id: 2,
    title: "The Little Princess",
    subtitle: "Personalized Fairy Tale",
    price: 34.98,
    originalPrice: 49.98,
    description: "Transform your little girl into the star of her own royal adventure! 'The Little Princess' is a magical personalized fairy tale where your child becomes the brave princess who saves the kingdom. With enchanting illustrations and a heartwarming story, this book celebrates courage, kindness, and the power of believing in yourself.",
    features: [
      "Your child becomes the main character princess",
      "Magical fairy tale with beautiful illustrations",
      "Teaches important values like courage and kindness",
      "Perfect for ages 3-7 years",
      "28 pages of enchanting content",
      "Premium hardcover with gold foil accents"
    ],
    specifications: {
      pages: 28,
      coverType: "Hardcover with gold foil",
      dimensions: "11x8.5 inches",
      ageRange: "3-7 years",
      paperQuality: "Premium matte paper",
      binding: "Perfect bound"
    },
    category: "Fairy Tale",
    rating: 4.8,
    reviews: 32,
    isNew: true,
    isSale: false,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  3: {
    id: 3,
    title: "Dinosaur Discovery",
    subtitle: "Personalized Adventure Book",
    price: 39.98,
    originalPrice: 54.98,
    description: "Journey back in time with your little paleontologist! 'Dinosaur Discovery' takes your child on an exciting prehistoric adventure where they become a brave dinosaur explorer. Meet friendly dinosaurs, discover fossils, and learn fascinating facts about these amazing creatures that once roamed the Earth.",
    features: [
      "Your child becomes a dinosaur explorer",
      "Educational content about prehistoric life",
      "Beautiful illustrations of various dinosaurs",
      "32 pages of adventure and learning",
      "Perfect for ages 2-6 years",
      "Includes fun dinosaur facts"
    ],
    specifications: {
      pages: 32,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "2-6 years",
      paperQuality: "100% digital recycled paper",
      binding: "Perfect bound"
    },
    category: "Adventure",
    rating: 4.7,
    reviews: 28,
    isNew: false,
    isSale: true,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  4: {
    id: 4,
    title: "Space Explorer",
    subtitle: "Personalized Sci-Fi Adventure",
    price: 44.98,
    originalPrice: 59.98,
    description: "Blast off into space with your little astronaut! 'Space Explorer' takes your child on an incredible intergalactic journey where they become the captain of their own spaceship. Explore distant planets, meet friendly aliens, and discover the wonders of the universe in this exciting personalized adventure.",
    features: [
      "Your child becomes a space captain",
      "Explore multiple planets and meet aliens",
      "Educational space facts throughout",
      "30 pages of cosmic adventure",
      "Perfect for ages 3-8 years",
      "Stunning space-themed illustrations"
    ],
    specifications: {
      pages: 30,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "3-8 years",
      paperQuality: "Premium matte paper",
      binding: "Perfect bound"
    },
    category: "Adventure",
    rating: 4.9,
    reviews: 45,
    isNew: false,
    isSale: false,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  5: {
    id: 5,
    title: "The Brave Knight",
    subtitle: "Personalized Medieval Tale",
    price: 37.98,
    originalPrice: null,
    description: "Your child becomes a courageous knight on a noble quest! 'The Brave Knight' transports your little hero to a magical medieval kingdom where they must rescue the princess and save the realm from dragons. This exciting tale teaches bravery, honor, and the importance of helping others.",
    features: [
      "Your child becomes a brave knight",
      "Epic medieval adventure with dragons",
      "Teaches values of courage and honor",
      "26 pages of heroic content",
      "Perfect for ages 3-7 years",
      "Beautiful castle and dragon illustrations"
    ],
    specifications: {
      pages: 26,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "3-7 years",
      paperQuality: "100% digital recycled paper",
      binding: "Perfect bound"
    },
    category: "Adventure",
    rating: 4.6,
    reviews: 67,
    isNew: true,
    isSale: false,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  6: {
    id: 6,
    title: "Under the Sea",
    subtitle: "Personalized Ocean Adventure",
    price: 32.98,
    originalPrice: 47.98,
    description: "Dive deep into the ocean with your little mermaid or merman! 'Under the Sea' takes your child on an underwater adventure where they become a friendly sea creature exploring coral reefs, meeting ocean friends, and discovering the beauty of marine life. A perfect blend of adventure and education.",
    features: [
      "Your child becomes a sea creature",
      "Explore coral reefs and ocean depths",
      "Meet friendly marine animals",
      "28 pages of underwater adventure",
      "Perfect for ages 2-6 years",
      "Educational ocean facts included"
    ],
    specifications: {
      pages: 28,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "2-6 years",
      paperQuality: "100% digital recycled paper",
      binding: "Perfect bound"
    },
    category: "Adventure",
    rating: 4.8,
    reviews: 41,
    isNew: false,
    isSale: true,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  7: {
    id: 7,
    title: "My First Day of School",
    subtitle: "Personalized School Story",
    price: 29.98,
    originalPrice: null,
    description: "Help your child prepare for their big day with 'My First Day of School'! This personalized story follows your little one through their first day at school, meeting new friends, learning exciting things, and discovering that school is a wonderful place to be. Perfect for easing first-day jitters.",
    features: [
      "Your child becomes the school star",
      "Helps ease first-day anxiety",
      "Positive school experience story",
      "24 pages of encouraging content",
      "Perfect for ages 3-6 years",
      "Builds confidence for school"
    ],
    specifications: {
      pages: 24,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "3-6 years",
      paperQuality: "100% digital recycled paper",
      binding: "Perfect bound"
    },
    category: "Educational",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isSale: false,
    inStock: true,
    shipping: "Free shipping on orders over $65"
  },
  8: {
    id: 8,
    title: "Christmas Magic",
    subtitle: "Personalized Holiday Book",
    price: 39.98,
    originalPrice: 54.98,
    description: "Experience the magic of Christmas with your child as the star! 'Christmas Magic' takes your little one on a festive adventure where they help Santa deliver presents, meet reindeer, and spread holiday cheer throughout the world. A heartwarming tale that captures the true spirit of Christmas.",
    features: [
      "Your child helps Santa deliver presents",
      "Magical Christmas adventure",
      "Meet Santa's reindeer and elves",
      "32 pages of holiday magic",
      "Perfect for ages 2-8 years",
      "Beautiful winter wonderland illustrations"
    ],
    specifications: {
      pages: 32,
      coverType: "Hardcover",
      dimensions: "11x8.5 inches",
      ageRange: "2-8 years",
      paperQuality: "Premium matte paper",
      binding: "Perfect bound"
    },
    category: "Holiday",
    rating: 4.9,
    reviews: 156,
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

            {/* Preview & Add to Cart */}
            <div className="space-y-4">
              <BookPreviewButton 
                bookId={product.id.toString()} 
                bookTitle={product.title}
                variant="outline"
                size="lg"
              />
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
