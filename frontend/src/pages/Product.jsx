import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const selected = products.find((item) => item._id === productId)
    if (selected) {
      setProductData(selected)
      setImage(selected.image[0])
    }
    window.scrollTo(0, 0)
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div className=" pt-10 bg-[#fafaf7] text-[#5C4033]">
      {/* Product View */}
      <div className="flex gap-12 flex-col lg:flex-row px-4 sm:px-8 lg:px-20">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-scroll gap-3 lg:w-[20%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-[24%] lg:w-full lg:mb-3 cursor-pointer rounded shadow-sm"
              />
            ))}
          </div>
          <div className="w-full lg:w-[80%]">
            <img src={image} alt="" className="w-full h-auto rounded-md shadow-md" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 mt-4 lg:mt-0">
          <h1 className="text-3xl font-semibold mb-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" />
            <p className="pl-2 text-sm">(122 reviews)</p>
          </div>
          <p className="text-2xl text-[#b97111] font-semibold">{currency} {productData.price}</p>
          <p className="mt-4 text-sm leading-relaxed text-justify">{productData.description}</p>

          {/* Size selection */}
          {productData.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 font-medium">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(s)}
                    className={`border px-4 py-2 rounded cursor-pointer text-sm ${
                      size === s
                        ? 'border-[#b97111] bg-[#f5eee3]'
                        : 'border-gray-200 hover:border-[#b97111]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-6 cursor-pointer bg-[#5C4033] text-white px-6 py-3 text-sm rounded hover:bg-[#b97111] transition-colors"
          >
            ADD TO CART
          </button>

          <hr className="my-8" />

          <ul className="text-sm space-y-1">
            <li>100% Original Product</li>
            <li>Cash on delivery available</li>
            <li>7-Day return & exchange policy</li>
          </ul>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20 px-4 sm:px-8 lg:px-20">
        <div className="flex gap-2 text-sm">
          <b className="border border-gray-300 px-5 py-3 bg-white rounded-t">Description</b>
          <p className="border border-gray-300 px-5 py-3 text-gray-400 rounded-t">Reviews (122)</p>
        </div>
        <div className="border border-gray-300 text-justify px-6 py-6 text-sm bg-white leading-relaxed rounded-b">
          <p className="mb-4">
            Crafted with attention to detail, this stylish piece combines comfort with contemporary
            design. Made from premium materials, it ensures breathability and long-lasting wear.
          </p>
          <p>
            Whether you're heading out casually or layering for a classy look, this item fits
            seamlessly into your wardrobe. Its versatile design pairs well with all styles, and its
            durable build guarantees confidence.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  )
}

export default Product
