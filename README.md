# StoryBug - Personalized Children's Books E-commerce Website

A modern, responsive e-commerce website for personalized children's books, built with Next.js 15, Supabase, and Tailwind CSS.

## 🚀 Features

### 🏠 Homepage
- **Hero Section**: Eye-catching hero with call-to-action buttons and featured product showcase
- **Featured Products**: Grid display of popular personalized books with ratings and pricing
- **Category Grid**: Visual category navigation with icons and descriptions
- **Newsletter Signup**: Email subscription with discount offer

### 🛍️ E-commerce Functionality
- **Product Catalog**: Comprehensive product listing with filtering and search
- **Product Details**: Detailed product pages with specifications, features, and images
- **Category Pages**: Organized book categories with descriptions and counts
- **Advanced Filtering**: Filter by category, age range, price, and cover type
- **Search Functionality**: Search across books, characters, and themes

### 🎨 Design & UX
- **Modern UI**: Clean, professional design with smooth animations
- **Responsive Design**: Mobile-first approach that works on all devices
- **Interactive Elements**: Hover effects, smooth transitions, and engaging visuals
- **Accessibility**: Proper semantic HTML and keyboard navigation

### 🧭 Navigation
- **Sticky Header**: Navigation with dropdown menus and search
- **Breadcrumb Navigation**: Clear user journey through the site
- **Footer**: Comprehensive footer with links, social media, and company info

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React icons
- **State Management**: React hooks and local state
- **Backend**: Supabase (ready for integration)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Main layout with navigation and footer
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   ├── page.tsx        # Products catalog
│   │   └── [id]/page.tsx   # Individual product pages
│   └── categories/
│       └── page.tsx        # Categories overview
├── components/
│   ├── navigation.tsx      # Header navigation
│   ├── footer.tsx          # Footer component
│   ├── hero.tsx            # Homepage hero section
│   ├── featured-products.tsx # Featured products grid
│   ├── category-grid.tsx   # Category navigation
│   ├── newsletter-signup.tsx # Newsletter subscription
│   ├── product-grid.tsx    # Product catalog grid
│   ├── product-filters.tsx # Product filtering sidebar
│   └── product-search.tsx  # Search and view controls
└── components/ui/           # Reusable UI components
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with featured product
- Product showcase grid
- Category navigation
- Newsletter signup

### Products (`/products`)
- Product catalog with filtering
- Search functionality
- Grid/list view options
- Pagination

### Categories (`/categories`)
- All book categories
- Featured categories highlight
- Category descriptions and counts

### Product Details (`/products/[id]`)
- Detailed product information
- Product specifications
- Add to cart functionality
- Related products

## 🎨 Customization

### Colors & Branding
- Primary colors defined in Tailwind config
- Easy to customize brand colors and themes
- Consistent color scheme throughout

### Content Management
- Mock data structure ready for CMS integration
- Easy to update product information
- Flexible category and product structure

### Styling
- Modular CSS with Tailwind
- Custom component variants
- Responsive design patterns

## 🔮 Future Enhancements

- **Shopping Cart**: Full cart functionality with Supabase
- **User Authentication**: User accounts and order history
- **Payment Integration**: Stripe or PayPal integration
- **Admin Panel**: Product management interface
- **Personalization Engine**: Book customization interface
- **Reviews System**: Customer reviews and ratings
- **Inventory Management**: Stock tracking and availability

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Performance

- **Next.js 15**: Latest performance optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Ready for Next.js Image component
- **Code Splitting**: Automatic route-based code splitting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
