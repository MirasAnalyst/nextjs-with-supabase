"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Trash2, 
  BookOpen,
  Heart,
  Truck,
  Gift
} from 'lucide-react'
import { useCartStore, cartUtils } from '@/lib/stores/cart-store'
import { PersonalizationPayload } from '@/lib/types/ecommerce'

export function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    getItemCount,
    getDiscounts
  } = useCartStore()

  const [isCheckingOut, setIsCheckingOut] = useState(false)

  if (!cart) return null

  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const total = getTotal()
  const itemCount = getItemCount()
  const discounts = getDiscounts()

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    
    try {
      // Validate cart
      const validation = cartUtils.validateCart(cart)
      if (!validation.isValid) {
        alert(`Please fix the following issues:\n${validation.errors.join('\n')}`)
        return
      }

      // Redirect to checkout
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to proceed to checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const formatPersonalization = (personalization: PersonalizationPayload) => {
    const parts = []
    if (personalization.childName) parts.push(`Name: ${personalization.childName}`)
    if (personalization.coverColor) parts.push(`Cover: ${personalization.coverColor}`)
    if (personalization.dedication) parts.push(`Dedication: ${personalization.dedication.substring(0, 30)}...`)
    return parts.join(' • ')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                {itemCount > 0 && (
                  <Badge className="bg-blue-500 text-white">
                    {itemCount}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add some personalized books to get started!
                  </p>
                  <Button onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-8 h-8 text-blue-500" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">
                            Product #{item.productId}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatPersonalization(item.personalization)}
                          </p>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-semibold text-sm">
                              {cartUtils.formatPrice(item.price)}
                            </span>
                            {item.compareAtPrice && item.compareAtPrice > item.price && (
                              <span className="text-xs text-gray-500 line-through">
                                {cartUtils.formatPrice(item.compareAtPrice)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                {/* Discounts */}
                {discounts.length > 0 && (
                  <div className="space-y-2">
                    {discounts.map((discount, index) => {
                      const discountObj = discount as { description: string; value: number }
                      return (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-green-600">
                            <Gift className="w-4 h-4" />
                            <span>{discountObj.description}</span>
                          </div>
                          <span className="text-green-600 font-medium">
                            -{cartUtils.formatPrice(discountObj.value)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Shipping Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Shipping</span>
                  </div>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'Free' : cartUtils.formatPrice(shipping)}
                  </span>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < 65 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Add {cartUtils.formatPrice(65 - subtotal)} more for free shipping!</span>
                      <span>{Math.round((subtotal / 65) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 65) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{cartUtils.formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{cartUtils.formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{cartUtils.formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>Made with love</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Free shipping over $65</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
