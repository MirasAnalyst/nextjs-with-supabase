"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Gift, Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export function NewsletterSignup() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              {t('newsletter.specialOffer')}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>
          </div>

          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder={t('newsletter.emailPlaceholder')}
                    className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('newsletter.join')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-blue-100 text-sm">
            <p>✓ {t('newsletter.noSpam')}</p>
            <p>✓ {t('newsletter.exclusiveDiscounts')}</p>
            <p>✓ {t('newsletter.earlyAccess')}</p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{t('newsletter.trustedBy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{t('newsletter.customerRating')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
