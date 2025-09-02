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
  Gift 
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
    featured: true
  },
  {
    id: 'princess',
    nameKey: 'categoryNames.princess',
    descriptionKey: 'categoryDescriptions.princess',
    icon: Crown,
    color: 'from-pink-500 to-rose-600',
    count: 8,
    featured: false
  },
  {
    id: 'unicorn',
    nameKey: 'categoryNames.unicorn',
    descriptionKey: 'categoryDescriptions.unicorn',
    icon: Sparkles,
    color: 'from-purple-500 to-violet-600',
    count: 6,
    featured: false
  },
  {
    id: 'monster-trucks',
    nameKey: 'categoryNames.monsterTrucks',
    descriptionKey: 'categoryDescriptions.monsterTrucks',
    icon: Car,
    color: 'from-orange-500 to-red-600',
    count: 10,
    featured: false
  },
  {
    id: 'dinosaur',
    nameKey: 'categoryNames.dinosaur',
    descriptionKey: 'categoryDescriptions.dinosaur',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    count: 9,
    featured: false
  },
  {
    id: 'birthday',
    nameKey: 'categoryNames.birthday',
    descriptionKey: 'categoryDescriptions.birthday',
    icon: Gift,
    color: 'from-yellow-500 to-amber-600',
    count: 15,
    featured: false
  },
  {
    id: 'christmas',
    nameKey: 'categoryNames.christmas',
    descriptionKey: 'categoryDescriptions.christmas',
    icon: Star,
    color: 'from-red-500 to-pink-600',
    count: 11,
    featured: false
  },
  {
    id: 'animals',
    nameKey: 'categoryNames.animals',
    descriptionKey: 'categoryDescriptions.animals',
    icon: Heart,
    color: 'from-teal-500 to-cyan-600',
    count: 14,
    featured: false
  }
]

export function CategoryGrid() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
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
              
              <CardContent className="p-6">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {t(category.descriptionKey)}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {category.count} {t('categories.booksAvailable')}
                  </span>
                  {category.featured && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {t('categories.featured')}
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

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="px-8 py-3">
            <Link href="/categories">{t('categories.viewAllCategories')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
