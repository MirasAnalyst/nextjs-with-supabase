"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Star, Truck, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              {t('hero.topBadge')}
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('hero.title')}
              <span className="text-blue-600 block">{t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Link href="/products">{t('hero.shopNow')}</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                {t('hero.previewBooks')}
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                {t('hero.freeShipping')}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                {t('hero.madeInUSA')}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-6 text-white text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">It&apos;s Bedtime</h3>
                <p className="text-blue-100">Personalized Baby Book</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29.98</span>
                  <span className="text-blue-200 line-through ml-2">$54.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
