"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu,
  ChevronDown,
  BookOpen
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { LanguageSwitcher } from './language-switcher'

const navigation = [
  {
    nameKey: 'nav.allBooks',
    href: '/products',
    children: [
      { nameKey: 'nav.boyBooks', href: '/categories/boy' },
      { nameKey: 'nav.girlBooks', href: '/categories/girl' },
      { nameKey: 'nav.babyBooks', href: '/categories/baby' },
      { nameKey: 'nav.christmasBooks', href: '/categories/christmas' },
      { nameKey: 'nav.easterBooks', href: '/categories/easter' },
    ]
  },
  {
    nameKey: 'nav.categories',
    href: '/categories',
    children: [
      { nameKey: 'nav.bedtime', href: '/categories/bedtime' },
      { nameKey: 'nav.princess', href: '/categories/princess' },
      { nameKey: 'nav.unicorn', href: '/categories/unicorn' },
      { nameKey: 'nav.monsterTrucks', href: '/categories/monster-trucks' },
      { nameKey: 'nav.dinosaur', href: '/categories/dinosaur' },
      { nameKey: 'nav.animals', href: '/categories/animals' },
    ]
  },
  {
    nameKey: 'nav.themes',
    href: '/themes',
    children: [
      { nameKey: 'nav.sports', href: '/themes/sports' },
      { nameKey: 'nav.fairyTale', href: '/themes/fairy-tale' },
      { nameKey: 'nav.adventure', href: '/themes/adventure' },
      { nameKey: 'nav.birthday', href: '/themes/birthday' },
    ]
  },
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.contact', href: '/contact' }
]

export function Navigation() {
  const { t } = useLanguage()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="bg-blue-600 text-white py-2 text-center text-sm">
          <p>🎉 FREE SHIPPING when ordering 3 or more books! Made & Shipped Fast From The USA</p>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <BookOpen className="w-8 h-8" />
            StoryBug
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.nameKey} className="relative group">
                <Link 
                  href={item.href}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  {t(item.nameKey)}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {item.children && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.nameKey}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      >
                        {t(child.nameKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t('nav.search')}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            
            <LanguageSwitcher />
            
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
