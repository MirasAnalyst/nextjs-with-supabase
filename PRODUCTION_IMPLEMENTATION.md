# Production-Grade Personalized Book E-commerce Platform

## 🎯 Overview

This is a production-ready e-commerce platform for personalized children's books, modeled after StoryBug's requirements. The platform features real-time book preview, multi-currency checkout, and U.S.-based print-and-ship fulfillment.

## 🏗️ Architecture

### Core Technologies
- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: Zustand for cart and global state
- **Backend**: Supabase for database and authentication
- **Personalization Service**: Node.js microservice for real-time book rendering
- **Payment**: Stripe integration
- **Performance**: Optimized for Core Web Vitals

### Key Features Implemented

#### ✅ 1. Core Business Features

**Catalog & Navigation**
- Category tree (Boy/Girl, Baby, Theme, Holiday, Adult)
- "All Books" hub with advanced search
- Product filtering and sorting

**Product Detail Page (PDP)**
- Media gallery with zoom, thumbnails, and mobile swipe
- Pricing with sale/compare-at price and "In Stock" flags
- Trust badges and social proof

**Personalization Wizard**
- Child's name input with validation and profanity filter
- Cover color selector with live preview
- Custom dedication text with character count
- Real-time validation and error handling

**Preview System**
- "Preview Full Book" generates 24-page preview in ≤3s
- Flipbook-style page viewer with navigation
- Zoom, fullscreen, and sharing capabilities
- Mobile-optimized touch controls

**Cart & Checkout**
- Add-to-cart with personalization payload
- Mini-cart drawer with quantity updates
- Automatic discount rules (free shipping over $65, 3+ books discount)
- Persistent cart storage

#### ✅ 2. Technical Implementation

**Personalization Service**
```typescript
// Real-time preview generation
POST /api/preview → returns signed URLs to rendered page images
POST /api/order-asset → persists print-ready PDF (300 dpi CMYK)
```

**Data Models**
- Comprehensive TypeScript interfaces for all entities
- Product variants (hardcover/softcover)
- Personalization payload with validation
- Order management with fulfillment tracking

**Performance Targets**
- LCP ≤ 2.5s (P95)
- FID/INP within Core Web Vitals good thresholds
- TTFB ≤ 500ms (edge cached)
- Preview generation ≤ 3s

#### ✅ 3. User Experience

**Customize & Preview Flow**
1. User enters child's name with validation
2. Selects cover color with live preview
3. Optionally adds dedication with character count
4. Clicks "Preview Full Book" → generates preview in ≤3s
5. Views flipbook with all 24 pages personalized

**Add to Cart Flow**
1. Personalization data stored in line item
2. Cover type selection updates price and shipping
3. Quantity controls with validation
4. Cart drawer shows personalized items

**Checkout Flow**
1. Cart validation ensures all personalizations complete
2. Tax/shipping computed by region
3. Payment processing with Stripe
4. Order confirmation with preview and ship date

#### ✅ 4. SEO & Social

**SEO Implementation**
- Canonical tags and meta descriptions
- Schema.org markup (Product, Offer, BreadcrumbList)
- Open Graph and Twitter Cards
- Dynamic OG images with child name mockups

**Performance Optimization**
- Next.js Image optimization with AVIF/WebP
- Lazy loading for gallery images
- Edge caching for static assets
- Bundle optimization and code splitting

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── products/[id]/           # Product detail pages
│   ├── checkout/                # Checkout flow
│   └── layout.tsx               # Root layout with providers
├── components/
│   ├── product/                 # Product-specific components
│   │   ├── personalization-wizard.tsx
│   │   └── book-preview.tsx
│   ├── cart/                    # Cart components
│   │   └── cart-drawer.tsx
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── types/                   # TypeScript definitions
│   │   └── ecommerce.ts
│   ├── services/                # Business logic
│   │   └── personalization.ts
│   └── stores/                  # State management
│       └── cart-store.ts
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_PERSONALIZATION_API_URL=http://localhost:3001
PERSONALIZATION_API_KEY=your_api_key
STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Start Personalization Service**
```bash
cd personalization-service
npm install
npm run dev
```

## 🔧 Key Components

### PersonalizationWizard
- Multi-step form with validation
- Real-time character counting
- Profanity filtering
- Cover color selection with preview
- Progress indicator

### BookPreview
- Flipbook-style page viewer
- Zoom and fullscreen modes
- Mobile-optimized touch controls
- Page navigation and thumbnails
- Download and sharing options

### CartDrawer
- Persistent cart storage
- Quantity controls
- Personalization display
- Discount calculations
- Free shipping progress

### CartStore (Zustand)
- State management for cart
- Automatic calculations
- Discount rules
- Validation utilities

## 📊 Performance Metrics

### Core Web Vitals Targets
- **LCP**: ≤ 2.5s (P95)
- **FID**: ≤ 100ms (P95)
- **INP**: ≤ 200ms (P95)
- **CLS**: ≤ 0.1

### Preview Generation
- **Target**: ≤ 3s for 24-page preview
- **Monitoring**: Performance logging
- **Optimization**: Caching and CDN

### Scalability
- **Preview Service**: 200 RPS burst capacity
- **Auto-scaling**: Queue long renders
- **Uptime**: 99.9% monthly target

## 🛡️ Security & Validation

### Input Validation
- Child name: letters, spaces, hyphens, apostrophes only
- Dedication: 500 character limit with profanity filter
- Cover color: enum validation
- Real-time validation with error messages

### Data Protection
- Personalization data encrypted in transit
- Secure API endpoints with authentication
- GDPR compliance for EU customers
- Secure payment processing with Stripe

## 🚢 Fulfillment Integration

### Print-on-Demand
- Webhook integration with print partners
- Asset generation (300 dpi CMYK PDFs)
- Order tracking and status updates
- SLA: ship within 3 business days

### Shipping
- Multiple shipping methods
- Tracked flat-rate from $6.99
- ETA by ZIP code and service
- Free shipping over $65

## 📈 Analytics & Monitoring

### Performance Monitoring
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Preview generation metrics
- Error tracking and alerting

### Business Analytics
- Conversion funnel tracking
- Personalization completion rates
- Cart abandonment analysis
- A/B testing framework

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Advanced search with filters
- [ ] Wishlist functionality
- [ ] Customer reviews and ratings
- [ ] Loyalty program integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)

### Phase 3 Features
- [ ] AI-powered book recommendations
- [ ] Voice personalization
- [ ] Augmented reality preview
- [ ] Subscription service
- [ ] White-label solutions

## 📝 API Documentation

### Personalization Service Endpoints

#### Generate Preview
```http
POST /api/preview
Content-Type: application/json

{
  "childName": "Emma",
  "coverColor": "blue",
  "dedication": "Made with love for our little princess",
  "locale": "en-US",
  "previewVersion": "v1",
  "artTheme": "bedtime"
}
```

#### Create Print Asset
```http
POST /api/order-asset
Content-Type: application/json

{
  "childName": "Emma",
  "coverColor": "blue",
  "dedication": "Made with love for our little princess",
  "locale": "en-US",
  "previewVersion": "v1",
  "artTheme": "bedtime"
}
```

## 🧪 Testing

### Test Coverage
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Performance testing for preview generation

### Test Commands
```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:perf     # Performance tests
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: support@storybug.com
- Documentation: [docs.storybug.com](https://docs.storybug.com)
- Status Page: [status.storybug.com](https://status.storybug.com)

---

**Built with ❤️ for creating magical personalized stories for children worldwide.**
