"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

const categories = [
  { id: 'bedtime', name: 'Bedtime', count: 12 },
  { id: 'birthday', name: 'Birthday', count: 15 },
  { id: 'christmas', name: 'Christmas', count: 11 },
  { id: 'easter', name: 'Easter', count: 8 },
  { id: 'princess', name: 'Princess', count: 8 },
  { id: 'unicorn', name: 'Unicorn', count: 6 },
  { id: 'monster-trucks', name: 'Monster Trucks', count: 10 },
  { id: 'dinosaur', name: 'Dinosaur', count: 9 },
  { id: 'animals', name: 'Animals', count: 14 },
  { id: 'sports', name: 'Sports', count: 7 },
  { id: 'fairy-tale', name: 'Fairy Tale', count: 9 },
  { id: 'adventure', name: 'Adventure', count: 11 }
]

const ageRanges = [
  { id: '0-1', name: '0-1 years', count: 8 },
  { id: '1-3', name: '1-3 years', count: 15 },
  { id: '3-5', name: '3-5 years', count: 22 },
  { id: '5-7', name: '5-7 years', count: 18 },
  { id: '7+', name: '7+ years', count: 12 }
]

const priceRanges = [
  { id: '0-25', name: 'Under $25', count: 5 },
  { id: '25-35', name: '$25 - $35', count: 18 },
  { id: '35-45', name: '$35 - $45', count: 25 },
  { id: '45+', name: 'Over $45', count: 12 }
]

const coverTypes = [
  { id: 'hardcover', name: 'Hardcover', count: 45 },
  { id: 'softcover', name: 'Softcover', count: 15 }
]

export function ProductFilters() {
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    ageRanges: true,
    priceRanges: true,
    coverTypes: true
  })

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    ageRanges: [],
    priceRanges: [],
    coverTypes: []
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...prev[filterType as keyof typeof prev], value]
        : prev[filterType as keyof typeof prev].filter(item => item !== value)
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      ageRanges: [],
      priceRanges: [],
      coverTypes: []
    })
  }

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{t('products.filters')}</h3>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            <X className="w-4 h-4 mr-1" />
            {t('products.clearAll')}
          </Button>
        )}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('nav.categories')}</CardTitle>
            {expandedSections.categories ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </CardHeader>
        {expandedSections.categories && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedFilters.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('categories', category.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.name} ({category.count})
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Age Ranges */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('ageRanges')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Age Range</CardTitle>
            {expandedSections.ageRanges ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </CardHeader>
        {expandedSections.ageRanges && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {ageRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.id}
                    checked={selectedFilters.ageRanges.includes(range.id)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('ageRanges', range.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={range.id} className="text-sm font-normal cursor-pointer">
                    {range.name} ({range.count})
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Price Ranges */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('priceRanges')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Price Range</CardTitle>
            {expandedSections.priceRanges ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </CardHeader>
        {expandedSections.priceRanges && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.id}
                    checked={selectedFilters.priceRanges.includes(range.id)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('priceRanges', range.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={range.id} className="text-sm font-normal cursor-pointer">
                    {range.name} ({range.count})
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Cover Types */}
      <Card>
        <CardHeader 
          className="pb-3 cursor-pointer"
          onClick={() => toggleSection('coverTypes')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Cover Type</CardTitle>
            {expandedSections.coverTypes ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </CardHeader>
        {expandedSections.coverTypes && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {coverTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedFilters.coverTypes.includes(type.id)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('coverTypes', type.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={type.id} className="text-sm font-normal cursor-pointer">
                    {type.name} ({type.count})
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Active Filters ({getActiveFiltersCount()})
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([filterType, values]) =>
                values.map((value) => (
                  <Badge
                    key={`${filterType}-${value}`}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(filterType, value, false)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
