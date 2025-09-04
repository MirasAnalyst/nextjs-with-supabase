// Core E-commerce Types for Personalized Book Store

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionBlocks: DescriptionBlock[]
  heroMedia: MediaItem
  gallery: MediaItem[]
  salePrice?: number
  regularPrice: number
  badges: ProductBadge[]
  specs: ProductSpecs
  shippingNotes: string[]
  trustBadges: TrustBadge[]
  categoryTags: string[]
  variants: ProductVariant[]
  seo: SEOData
  createdAt: string
  updatedAt: string
}

export interface DescriptionBlock {
  id: string
  type: 'text' | 'features' | 'testimonial' | 'faq'
  title?: string
  content: string
  order: number
}

export interface MediaItem {
  id: string
  url: string
  alt: string
  type: 'image' | 'gif' | 'video'
  width: number
  height: number
  thumbnail?: string
}

export interface ProductBadge {
  type: 'new' | 'sale' | 'bestseller' | 'limited'
  text: string
  color: string
}

export interface ProductSpecs {
  pages: number
  size: string // "11×8.5″"
  coverOptions: CoverType[]
  paperType: string
  binding: string
  ageRange: string
  weight: number // in grams
}

export interface TrustBadge {
  icon: string
  text: string
  link?: string
}

export interface ProductVariant {
  id: string
  coverType: CoverType
  price: number
  compareAtPrice?: number
  weight: number
  stockPolicy: 'always_available' | 'limited'
  isAvailable: boolean
}

export type CoverType = 'hardcover' | 'softcover'

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogImage?: string
}

// Personalization Types
export interface PersonalizationPayload {
  childName: string
  coverColor: CoverColor
  dedication?: string
  locale: string
  previewVersion: string
  artTheme: string
}

export type CoverColor = 
  | 'blue' 
  | 'pink' 
  | 'purple' 
  | 'green' 
  | 'yellow' 
  | 'red' 
  | 'orange' 
  | 'teal'

export interface PreviewResponse {
  pages: PreviewPage[]
  assetId: string
  expiresAt: string
}

export interface PreviewPage {
  pageNumber: number
  imageUrl: string
  thumbnailUrl: string
  width: number
  height: number
}

// Cart & Checkout Types
export interface CartItem {
  id: string
  productId: string
  variantId: string
  quantity: number
  personalization: PersonalizationPayload
  price: number
  compareAtPrice?: number
  addedAt: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  discounts: Discount[]
  createdAt: string
  updatedAt: string
}

export interface Discount {
  id: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  code?: string
  description: string
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  customerId: string
  items: OrderItem[]
  personalizations: OrderPersonalization[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  shippingAddress: Address
  billingAddress: Address
  shippingMethod: ShippingMethod
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  variantId: string
  quantity: number
  price: number
  personalization: PersonalizationPayload
}

export interface OrderPersonalization {
  orderItemId: string
  assetId: string
  printReadyPdfUrl: string
  status: 'pending' | 'generated' | 'sent_to_printer' | 'printed' | 'shipped'
  createdAt: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled' | 'shipped' | 'delivered'

export interface Address {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  phone?: string
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  serviceLevel: 'standard' | 'expedited' | 'overnight'
}

// Category Types
export interface Category {
  id: string
  handle: string
  name: string
  description: string
  parentId?: string
  children: Category[]
  products: Product[]
  seo: SEOData
  order: number
  isActive: boolean
}

// Search & Filter Types
export interface SearchFilters {
  categories: string[]
  priceRange: [number, number]
  ageRange: string[]
  coverType: CoverType[]
  inStock: boolean
  onSale: boolean
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
  filters: SearchFilters
  sortBy: SortOption
}

export type SortOption = 
  | 'relevance' 
  | 'price_low_high' 
  | 'price_high_low' 
  | 'newest' 
  | 'best_selling' 
  | 'rating'

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Webhook Types
export interface PrintWebhookPayload {
  orderId: string
  assetId: string
  coverType: CoverType
  shippingAddress: Address
  serviceLevel: string
  trackingNumber?: string
  status: 'created' | 'printed' | 'shipped' | 'delivered' | 'failed'
}

// Performance & Analytics Types
export interface PerformanceMetrics {
  lcp: number
  fid: number
  inp: number
  ttfb: number
  cls: number
}

export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  userId?: string
  sessionId: string
}
