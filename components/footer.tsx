"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const footerLinks = {
  shop: [
    { name: 'All Books', href: '/products' },
    { name: 'Boy Books', href: '/categories/boy' },
    { name: 'Girl Books', href: '/categories/girl' },
    { name: 'Baby Books', href: '/categories/baby' },
    { name: 'Christmas Books', href: '/categories/christmas' },
    { name: 'Easter Books', href: '/categories/easter' },
  ],
  categories: [
    { name: 'Bedtime', href: '/categories/bedtime' },
    { name: 'Princess', href: '/categories/princess' },
    { name: 'Unicorn', href: '/categories/unicorn' },
    { name: 'Monster Trucks', href: '/categories/monster-trucks' },
    { name: 'Dinosaur', href: '/categories/dinosaur' },
    { name: 'Animals', href: '/categories/animals' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Wholesale', href: '/wholesale' },
  ]
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{t('footer.stayUpdated')}</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('footer.footerSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              {t('footer.subscribe')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <BookOpen className="w-8 h-8" />
              StoryBug
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Creating magical, personalized stories that make every child the hero of their own adventure. 
              Made with love in the USA, shipped worldwide.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t('footer.madeInUSA')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{t('footer.email')}</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Company */}
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{t('footer.copyright')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('footer.inUSA')}</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                {t('footer.termsOfService')}
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
