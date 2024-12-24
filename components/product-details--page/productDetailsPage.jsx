import React from 'react'
import ProductDetails from './section/productDetails'
import { FrequentlyBoughtTogether } from './section/BoughtTogether'
import RelatedProduct from './section/relatedProduct'
import ProductDiscover from './section/productDiscover'

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
