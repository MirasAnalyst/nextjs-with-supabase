import { Suspense } from 'react'
import { Hero } from '@/components/hero'
import { FeaturedProducts } from '@/components/featured-products'
import { CategoryGrid } from '@/components/category-grid'
import { NewsletterSignup } from '@/components/newsletter-signup'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <NewsletterSignup />
    </div>
  )
}
