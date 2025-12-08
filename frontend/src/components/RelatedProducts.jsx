import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/context'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      setRelated(productsCopy.slice(0, 5))
    }
  }, [products, category])

  return (
    <section className="bg-[#0F172A] py-16 px-6 sm:px-12 lg:px-20 text-white">
      <div className="text-center text-3xl mb-10">
        <Title text1="RELATED" text2="PRODUCTS" />
        <p className="text-sm text-[#D4AF37] mt-2">You might also like these from the same category</p>
        <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
        {related.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-300 hover:scale-[1.03]"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
