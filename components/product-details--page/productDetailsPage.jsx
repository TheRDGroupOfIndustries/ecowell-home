import React from 'react'
import ProductDetails from './section/productDetails'
import { FrequentlyBoughtTogether } from './section/BoughtTogether'
import RelatedProduct from '../pages/products/components/RelatedProduct'
import ProductDiscover from '../pages/products/components/ProductDiscover'

export default function ProductDetailsPage() {
  return (
    <div>
      <ProductDetails/>
      <FrequentlyBoughtTogether/>
      <RelatedProduct/>
      <ProductDiscover/>
    </div>
  )
}
