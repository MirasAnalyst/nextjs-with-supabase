// Cart Store using Zustand for state management
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, PersonalizationPayload } from '@/lib/types/ecommerce'

interface CartStore {
  // State
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Calculations
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getTotal: () => number
  getItemCount: () => number
  getDiscounts: () => any[]
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: {
        id: 'default-cart',
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        currency: 'USD',
        discounts: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isOpen: false,
      isLoading: false,

      // Actions
      addItem: (newItem) => {
        set((state) => {
          if (!state.cart) return state

          const existingItemIndex = state.cart.items.findIndex(
            item => 
              item.productId === newItem.productId &&
              item.variantId === newItem.variantId &&
              JSON.stringify(item.personalization) === JSON.stringify(newItem.personalization)
          )

          let updatedItems: CartItem[]

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            updatedItems = state.cart.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          } else {
            // Add new item
            const cartItem: CartItem = {
              ...newItem,
              id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              addedAt: new Date().toISOString(),
            }
            updatedItems = [...state.cart.items, cartItem]
          }

          const updatedCart = {
            ...state.cart,
            items: updatedItems,
            updatedAt: new Date().toISOString(),
          }

          return {
            cart: updatedCart,
            isOpen: true, // Auto-open cart when item is added
          }
        })
      },

      removeItem: (itemId) => {
        set((state) => {
          if (!state.cart) return state

          const updatedItems = state.cart.items.filter(item => item.id !== itemId)
          
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              updatedAt: new Date().toISOString(),
            }
          }
        })
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => {
          if (!state.cart || quantity <= 0) return state

          const updatedItems = state.cart.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              updatedAt: new Date().toISOString(),
            }
          }
        })
      },

      clearCart: () => {
        set((state) => ({
          cart: state.cart ? {
            ...state.cart,
            items: [],
            updatedAt: new Date().toISOString(),
          } : null
        }))
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      // Calculations
      getSubtotal: () => {
        const { cart } = get()
        if (!cart) return 0
        
        return cart.items.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      },

      getTax: () => {
        const { getSubtotal } = get()
        const subtotal = getSubtotal()
        // Simple 8% tax calculation - in production, use proper tax service
        return subtotal * 0.08
      },

      getShipping: () => {
        const { getSubtotal } = get()
        const subtotal = getSubtotal()
        
        // Free shipping over $65
        if (subtotal >= 65) return 0
        
        // Standard shipping rates
        if (subtotal >= 35) return 4.99
        return 6.99
      },

      getTotal: () => {
        const { getSubtotal, getTax, getShipping } = get()
        return getSubtotal() + getTax() + getShipping()
      },

      getItemCount: () => {
        const { cart } = get()
        if (!cart) return 0
        
        return cart.items.reduce((total, item) => total + item.quantity, 0)
      },

      getDiscounts: () => {
        const { getSubtotal, getShipping } = get()
        const subtotal = getSubtotal()
        const shipping = getShipping()
        
        const discounts = []
        
        // Free shipping discount
        if (subtotal >= 65 && shipping > 0) {
          discounts.push({
            type: 'free_shipping',
            value: shipping,
            description: 'Free shipping on orders over $65',
          })
        }
        
        // 3+ books discount
        const { cart } = get()
        if (cart && cart.items.length >= 3) {
          discounts.push({
            type: 'bulk_discount',
            value: subtotal * 0.1, // 10% off
            description: '10% off when ordering 3+ books',
          })
        }
        
        return discounts
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)

// Cart utilities
export const cartUtils = {
  // Format price for display
  formatPrice: (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price)
  },

  // Calculate savings
  calculateSavings: (originalPrice: number, salePrice: number) => {
    return originalPrice - salePrice
  },

  // Get shipping estimate
  getShippingEstimate: (subtotal: number) => {
    if (subtotal >= 65) return { cost: 0, description: 'Free shipping' }
    if (subtotal >= 35) return { cost: 4.99, description: 'Standard shipping' }
    return { cost: 6.99, description: 'Standard shipping' }
  },

  // Validate cart for checkout
  validateCart: (cart: Cart) => {
    const errors: string[] = []
    
    if (!cart.items.length) {
      errors.push('Cart is empty')
    }
    
    cart.items.forEach((item, index) => {
      if (!item.personalization.childName) {
        errors.push(`Item ${index + 1}: Child name is required`)
      }
      
      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Invalid quantity`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
