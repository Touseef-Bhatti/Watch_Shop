import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <section className="bg-[#fafaf7] py-16 px-4 sm:px-8 lg:px-16">
      <div className="text-center text-3xl pb-8">
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#5C4033] mt-2">
          Your next favorite is already a bestseller
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  )
}

export default BestSeller
