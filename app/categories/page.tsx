"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Crown, 
  Sparkles, 
  Car, 
  TreePine, 
  Heart, 
  Star, 
  Gift,
  Egg,
  Trophy
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const categories = [
  {
    id: 'bedtime',
    nameKey: 'categoryNames.bedtime',
    descriptionKey: 'categoryDescriptions.bedtime',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    count: 12,
    featured: true,
    popular: true
  },
  {
    id: 'princess',
    nameKey: 'categoryNames.princess',
    descriptionKey: 'categoryDescriptions.princess',
    icon: Crown,
    color: 'from-pink-500 to-rose-600',
    count: 8,
    featured: false,
    popular: true
  },
  {
    id: 'unicorn',
    nameKey: 'categoryNames.unicorn',
    descriptionKey: 'categoryDescriptions.unicorn',
    icon: Sparkles,
    color: 'from-purple-500 to-violet-600',
    count: 6,
    featured: false,
    popular: false
  },
  {
    id: 'monster-trucks',
    nameKey: 'categoryNames.monsterTrucks',
    descriptionKey: 'categoryDescriptions.monsterTrucks',
    icon: Car,
    color: 'from-orange-500 to-red-600',
    count: 10,
    featured: false,
    popular: true
  },
  {
    id: 'dinosaur',
    nameKey: 'categoryNames.dinosaur',
    descriptionKey: 'categoryDescriptions.dinosaur',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    count: 9,
    featured: false,
    popular: true
  },
  {
    id: 'birthday',
    nameKey: 'categoryNames.birthday',
    descriptionKey: 'categoryDescriptions.birthday',
    icon: Gift,
    color: 'from-yellow-500 to-amber-600',
    count: 15,
    featured: true,
    popular: true
  },
  {
    id: 'christmas',
    nameKey: 'categoryNames.christmas',
    descriptionKey: 'categoryDescriptions.christmas',
    icon: Star,
    color: 'from-red-500 to-pink-600',
    count: 11,
    featured: false,
    popular: true
  },
  {
    id: 'easter',
    nameKey: 'categoryNames.easter',
    descriptionKey: 'categoryDescriptions.easter',
    icon: Egg,
    color: 'from-green-400 to-blue-500',
    count: 8,
    featured: false,
    popular: false
  },
  {
    id: 'animals',
    nameKey: 'categoryNames.animals',
    descriptionKey: 'categoryDescriptions.animals',
    icon: Heart,
    color: 'from-teal-500 to-cyan-600',
    count: 14,
    featured: false,
    popular: true
  },
  {
    id: 'sports',
    nameKey: 'categoryNames.sports',
    descriptionKey: 'categoryDescriptions.sports',
    icon: Trophy,
    color: 'from-blue-600 to-purple-700',
    count: 7,
    featured: false,
    popular: false
  },
  {
    id: 'fairy-tale',
    nameKey: 'categoryNames.fairyTale',
    descriptionKey: 'categoryDescriptions.fairyTale',
    icon: Crown,
    color: 'from-purple-600 to-pink-700',
    count: 9,
    featured: false,
    popular: true
  },
  {
    id: 'adventure',
    nameKey: 'categoryNames.adventure',
    descriptionKey: 'categoryDescriptions.adventure',
    icon: TreePine,
    color: 'from-green-600 to-blue-700',
    count: 11,
    featured: false,
    popular: true
  }
]

export default function CategoriesPage() {
  const { t } = useLanguage()
  const featuredCategories = categories.filter(cat => cat.featured)
  const allCategories = categories

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            {t('categories.categories')}
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            {t('categories.categoriesSubtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('categories.featuredCategories')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardHeader className="p-0">
                  <div className={`bg-gradient-to-br ${category.color} p-8 text-white text-center`}>
                    <category.icon className="w-16 h-16 mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold">
                      {t(category.nameKey)}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t(category.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {category.count} {t('categories.booksAvailable')}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {t('categories.featured')}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800" 
                    asChild
                  >
                    <Link href={`/categories/${category.id}`}>
                      {t('categories.browse')} {t(category.nameKey)}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('categories.allCategories')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCategories.map((category) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <CardHeader className="p-0">
                  <div className={`bg-gradient-to-br ${category.color} p-6 text-white text-center`}>
                    <category.icon className="w-12 h-12 mx-auto mb-3" />
                    <CardTitle className="text-lg font-semibold">
                      {t(category.nameKey)}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {t(category.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {category.count} {t('categories.booksAvailable')}
                    </span>
                    {category.popular && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        {t('categories.popular')}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800" 
                    asChild
                  >
                    <Link href={`/categories/${category.id}`}>
                      {t('categories.browse')} {t(category.nameKey)}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
