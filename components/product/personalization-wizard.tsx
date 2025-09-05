"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Palette, 
  Type, 
  Heart, 
  Eye, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { usePersonalization } from '@/lib/services/personalization'
import { PersonalizationPayload, CoverColor, PreviewResponse } from '@/lib/types/ecommerce'

// Validation schema
const personalizationSchema = z.object({
  childName: z.string()
    .min(1, 'Child name is required')
    .max(50, 'Child name must be 50 characters or less')
    .regex(/^[a-zA-Z\s\-']+$/, 'Child name can only contain letters, spaces, hyphens, and apostrophes'),
  coverColor: z.enum(['blue', 'pink', 'purple', 'green', 'yellow', 'red', 'orange', 'teal']),
  dedication: z.string()
    .max(500, 'Dedication must be 500 characters or less')
    .optional(),
})

type PersonalizationForm = z.infer<typeof personalizationSchema>

interface PersonalizationWizardProps {
  productId: string
  onPersonalizationChange: (payload: PersonalizationPayload) => void
  onPreviewGenerated: (preview: PreviewResponse) => void
}

const coverColors: { value: CoverColor; label: string; preview: string }[] = [
  { value: 'blue', label: 'Ocean Blue', preview: 'bg-blue-500' },
  { value: 'pink', label: 'Rose Pink', preview: 'bg-pink-500' },
  { value: 'purple', label: 'Royal Purple', preview: 'bg-purple-500' },
  { value: 'green', label: 'Forest Green', preview: 'bg-green-500' },
  { value: 'yellow', label: 'Sunshine Yellow', preview: 'bg-yellow-500' },
  { value: 'red', label: 'Cherry Red', preview: 'bg-red-500' },
  { value: 'orange', label: 'Sunset Orange', preview: 'bg-orange-500' },
  { value: 'teal', label: 'Mint Teal', preview: 'bg-teal-500' },
]

export function PersonalizationWizard({ 
  productId, 
  onPersonalizationChange, 
  onPreviewGenerated 
}: PersonalizationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewGenerating, setIsPreviewGenerating] = useState(false)
  
  const { 
    register, 
    watch, 
    setValue, 
    formState: { errors }
  } = useForm<PersonalizationForm>({
    resolver: zodResolver(personalizationSchema),
    mode: 'onChange',
  })

  const { generatePreview, validateInputs, getCharacterCount } = usePersonalization()
  
  const watchedValues = watch()
  const dedication = watch('dedication') || ''
  const characterCount = getCharacterCount(dedication)

  // Auto-save personalization as user types
  useEffect(() => {
    if (watchedValues.childName && watchedValues.coverColor) {
      const payload: PersonalizationPayload = {
        childName: watchedValues.childName,
        coverColor: watchedValues.coverColor,
        dedication: watchedValues.dedication || '',
        locale: 'en-US',
        previewVersion: 'v1',
        artTheme: productId,
      }
      
      onPersonalizationChange(payload)
    }
  }, [watchedValues, productId, onPersonalizationChange])

  const handlePreviewGeneration = async () => {
    setIsPreviewGenerating(true)
    
    try {
      const payload: PersonalizationPayload = {
        childName: watchedValues.childName,
        coverColor: watchedValues.coverColor,
        dedication: watchedValues.dedication || '',
        locale: 'en-US',
        previewVersion: 'v1',
        artTheme: productId,
      }

      const validation = validateInputs(payload)
      if (!validation.isValid) {
        console.error('Validation errors:', validation.errors)
        return
      }

      const preview = await generatePreview(payload)
      onPreviewGenerated(preview)
      setCurrentStep(3)
    } catch (error) {
      console.error('Preview generation failed:', error)
    } finally {
      setIsPreviewGenerating(false)
    }
  }

  const steps = [
    { id: 1, title: 'Child\'s Name', icon: Type },
    { id: 2, title: 'Cover Color', icon: Palette },
    { id: 3, title: 'Preview', icon: Eye },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Personalize Your Book
        </CardTitle>
        
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep >= step.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Child's Name */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="childName" className="text-lg font-medium">
                What&apos;s your child&apos;s name?
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                This will appear on the cover and throughout the story
              </p>
            </div>
            
            <div className="space-y-2">
              <Input
                id="childName"
                placeholder="Enter your child's name"
                {...register('childName')}
                className="text-lg"
                maxLength={50}
              />
              {errors.childName && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.childName.message}
                </div>
              )}
              <div className="text-xs text-gray-500">
                {watchedValues.childName?.length || 0}/50 characters
              </div>
            </div>

            <Button 
              onClick={() => setCurrentStep(2)}
              disabled={!watchedValues.childName || !!errors.childName}
              className="w-full"
            >
              Continue to Cover Color
            </Button>
          </div>
        )}

        {/* Step 2: Cover Color */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-medium">
                Choose a cover color
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Select the perfect color for your book&apos;s cover
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {coverColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setValue('coverColor', color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    watchedValues.coverColor === color.value
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-12 rounded ${color.preview} mb-2`} />
                  <div className="text-xs font-medium text-center">{color.label}</div>
                </button>
              ))}
            </div>

            {/* Dedication (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="dedication" className="text-lg font-medium">
                Add a special dedication (optional)
              </Label>
              <p className="text-sm text-gray-600">
                A personal message that will appear at the beginning of the book
              </p>
              
              <textarea
                id="dedication"
                placeholder="Dear [Child&apos;s Name], this book was made with love..."
                {...register('dedication')}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
                maxLength={500}
              />
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">
                  {characterCount.remaining} characters remaining
                </span>
                <span className={`${
                  characterCount.remaining < 50 ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {characterCount.current}/{characterCount.max}
                </span>
              </div>
              
              {errors.dedication && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dedication.message}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handlePreviewGeneration}
                disabled={!watchedValues.coverColor || isPreviewGenerating}
                className="flex-1"
              >
                {isPreviewGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Preview...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Full Book
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview Generated */}
        {currentStep === 3 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Preview Generated Successfully!
              </h3>
              <p className="text-gray-600 mt-1">
                Your personalized book preview is ready to view
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Child&apos;s Name:</strong> {watchedValues.childName}</div>
                <div><strong>Cover Color:</strong> {coverColors.find(c => c.value === watchedValues.coverColor)?.label}</div>
                {watchedValues.dedication && (
                  <div><strong>Dedication:</strong> {watchedValues.dedication}</div>
                )}
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(2)}
              className="w-full"
            >
              Make Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
