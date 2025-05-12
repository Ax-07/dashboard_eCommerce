// @/src/stores/addProduct.store.ts

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ProductInput } from '@/src/lib/validators/product.zod'

export interface AddProductState {
  product: ProductInput
  getProduct: () => ProductInput
  setProduct: (product: ProductInput) => void
  setProductField: <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => void
  resetProduct: () => void
}

const defaultProduct: ProductInput = {
  name: '',
  description: '',
  price: 0,
  unit: 'g',
  stock: { 
    quantity: 0,
    min: 0,
    max: 0,
  },
  categoryId: '',
  subCategoryId: '',
  options: [],
  media: [],
  promotion: { isOnSale: false, discountPercentage: 0 },
  marketing: {
    isFeatured: false,
    isBestSeller: false,
    isLimitedEdition: false,
    isNew: false,
    isPopular: false,
    isTrending: false,
  },
}

export const useAddProductStore = create<AddProductState>()(
  devtools(
    persist(
      (set, get) => ({
        product: defaultProduct,
        getProduct: () => get().product,
        setProduct: (product) => set({ product }),
        setProductField: (field, value) => set((state) => ({
          product: { ...state.product, [field]: value }
        })),

        resetProduct: () => set({ product: defaultProduct }),
      }),
      {
        name: 'add-product-store',
      }
    )
  )
)
