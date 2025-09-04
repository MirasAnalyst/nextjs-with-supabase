"use client"

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Heart, 
  Star, 
  ShoppingCart, 
  Truck, 
  Shield, 
  CheckCircle,
  Share2,
  Zoom,
  Play,
  Users,
  Award,
  Clock,
  MapPin
} from 'lucide-react'
import { PersonalizationWizard } from '@/components/product/personalization-wizard'
import { BookPreview } from '@/components/product/book-preview'
import { Product, PersonalizationPayload, PreviewResponse } from '@/lib/types/ecommerce'
import { usePersonalization } from '@/lib/services/personalization'

// Enhanced product data with all required fields
const products: Record<string, Product> = {
  "1": {
    id: "1",
    handle: "its-bedtime-personalized-baby-book",
    title: "It's Bedtime",
    description: "Create a soothing bedtime routine with 'It's Bedtime' Personalized Baby Book, designed to guide your little adventurers into dreamland with stories that feature them as the main character.",
    descriptionBlocks: [
      {
        id: "1",
        type: "text",
        title: "What's this book about?",
        content: "This magical bedtime story transforms your child into the main character of their own peaceful adventure. As they journey through dreamland, they'll meet friendly characters and learn the importance of a good night's sleep.",
        order: 1
      },
      {
        id: "2",
        type: "features",
        title: "Kids love...",
        content: "Seeing their name throughout the story, the calming illustrations, and the special bedtime routine it creates.",
        order: 2
      },
      {
        id: "3",
        type: "text",
        title: "Makes the perfect keepsake...",
        content: "This personalized book becomes a treasured family heirloom that your child will want to read again and again, creating lasting memories of bedtime stories together.",
        order: 3
      }
    ],
    heroMedia: {
      id: "1",
      url: "/api/placeholder/600/800",
      alt: "It's Bedtime book cover",
      type: "image",
      width: 600,
      height: 800
    },
    gallery: [
      {
        id: "1",
        url: "/api/placeholder/600/800",
        alt: "Book cover",
        type: "image",
        width: 600,
        height: 800,
        thumbnail: "/api/placeholder/150/200"
      },
      {
        id: "2",
        url: "/api/placeholder/600/800",
        alt: "Sample page 1",
        type: "image",
        width: 600,
        height: 800,
        thumbnail: "/api/placeholder/150/200"
      },
      {
        id: "3",
        url: "/api/placeholder/600/800",
        alt: "Sample page 2",
        type: "image",
        width: 600,
        height: 800,
        thumbnail: "/api/placeholder/150/200"
      }
    ],
    salePrice: 29.98,
    regularPrice: 54.98,
    badges: [
      { type: "sale", text: "45% Off", color: "bg-red-500" },
      { type: "bestseller", text: "Bestseller", color: "bg-green-500" }
    ],
    specs: {
      pages: 24,
      size: "11×8.5″",
      coverOptions: ["hardcover", "softcover"],
      paperType: "100% digital recycled paper",
      binding: "Perfect bound",
      ageRange: "0-3 years",
      weight: 400
    },
    shippingNotes: [
      "Free shipping on orders over $65",
      "Ships within 3 business days",
      "Made in USA"
    ],
    trustBadges: [
      { icon: "shield", text: "Love it or your money back", link: "/guarantee" },
      { icon: "award", text: "Trustpilot 4.9/5 stars", link: "https://trustpilot.com" },
      { icon: "truck", text: "Free shipping over $65", link: "/shipping" }
    ],
    categoryTags: ["bedtime", "baby", "personalized"],
    variants: [
      {
        id: "hardcover",
        coverType: "hardcover",
        price: 29.98,
        compareAtPrice: 54.98,
        weight: 400,
        stockPolicy: "always_available",
        isAvailable: true
      },
      {
        id: "softcover",
        coverType: "softcover",
        price: 24.98,
        compareAtPrice: 44.98,
        weight: 300,
        stockPolicy: "always_available",
        isAvailable: true
      }
    ],
    seo: {
      title: "It's Bedtime - Personalized Baby Book | StoryBug",
      description: "Create magical bedtime memories with our personalized 'It's Bedtime' baby book. Features your child's name throughout the story. Free shipping over $65.",
      keywords: ["personalized baby book", "bedtime story", "children's book", "custom book"],
      canonicalUrl: "/products/its-bedtime-personalized-baby-book"
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedVariant, setSelectedVariant] = useState("hardcover")
  const [personalization, setPersonalization] = useState<PersonalizationPayload | null>(null)
  const [preview, setPreview] = useState<PreviewResponse | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const product = products[params.id]
  const currentVariant = product?.variants.find(v => v.id === selectedVariant)

  if (!product) {
    notFound()
  }

  const handlePersonalizationChange = (payload: PersonalizationPayload) => {
    setPersonalization(payload)
  }

  const handlePreviewGenerated = (previewData: PreviewResponse) => {
    setPreview(previewData)
    setShowPreview(true)
  }

  const handleAddToCart = async () => {
    if (!personalization) {
      alert("Please complete the personalization first")
      return
    }

    setIsAddingToCart(true)
    
    try {
      // Add to cart logic here
      console.log("Adding to cart:", {
        productId: product.id,
        variantId: selectedVariant,
        quantity,
        personalization
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert("Added to cart successfully!")
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("Failed to add to cart. Please try again.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const discountAmount = currentVariant?.compareAtPrice 
    ? currentVariant.compareAtPrice - currentVariant.price 
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <head>
        <title>{product.seo.title}</title>
        <meta name="description" content={product.seo.description} />
        <meta name="keywords" content={product.seo.keywords.join(", ")} />
        <link rel="canonical" href={product.seo.canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={product.seo.title} />
        <meta property="og:description" content={product.seo.description} />
        <meta property="og:image" content={product.heroMedia.url} />
        <meta property="og:type" content="product" />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.title,
              "description": product.description,
              "image": product.gallery.map(img => img.url),
              "offers": {
                "@type": "Offer",
                "price": currentVariant?.price,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "StoryBug"
                }
              }
            })
          }}
        />
      </head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Media Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <BookOpen className="w-32 h-32 text-blue-500" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.badges.map((badge, index) => (
                  <Badge key={index} className={`${badge.color} text-white`}>
                    {badge.text}
                  </Badge>
                ))}
              </div>

              {/* Zoom Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <Zoom className="w-4 h-4" />
              </Button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2">
              {product.gallery.map((media, index) => (
                <div
                  key={media.id}
                  className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 border-2 border-transparent hover:border-blue-300"
                >
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-500">(1,247 reviews)</span>
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
                ${currentVariant?.price}
              </span>
              {currentVariant?.compareAtPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">
                    ${currentVariant.compareAtPrice}
                  </span>
                  <Badge className="bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                    Save ${discountAmount.toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Variant Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Cover Type</h3>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedVariant === variant.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium capitalize">
                      {variant.coverType}
                    </div>
                    <div className="text-lg font-bold">
                      ${variant.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization Wizard */}
            <PersonalizationWizard
              productId={product.id}
              onPersonalizationChange={handlePersonalizationChange}
              onPreviewGenerated={handlePreviewGenerated}
            />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                
                <Button 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleAddToCart}
                  disabled={!personalization || isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                {product.shippingNotes[0]}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {product.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  {badge.icon === 'shield' && <Shield className="w-5 h-5 text-green-600" />}
                  {badge.icon === 'award' && <Award className="w-5 h-5 text-green-600" />}
                  {badge.icon === 'truck' && <Truck className="w-5 h-5 text-green-600" />}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="space-y-6">
                {product.descriptionBlocks.map((block) => (
                  <Card key={block.id}>
                    <CardHeader>
                      <CardTitle>{block.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{block.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Pages</span>
                        <span className="text-gray-600">{product.specs.pages}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Size</span>
                        <span className="text-gray-600">{product.specs.size}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Paper Type</span>
                        <span className="text-gray-600">{product.specs.paperType}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Binding</span>
                        <span className="text-gray-600">{product.specs.binding}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Age Range</span>
                        <span className="text-gray-600">{product.specs.ageRange}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Weight</span>
                        <span className="text-gray-600">{product.specs.weight}g</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Reviews coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span>Free shipping on orders over $65</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Ships within 3 business days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span>Made in USA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Book Preview Modal */}
      {showPreview && preview && (
        <BookPreview
          preview={preview}
          isGenerating={false}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}
