import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="bg-[#fafaf7] pt-14 px-4 sm:px-8 text-[#5C4033] min-h-screen flex flex-col">
      {/* Page Title */}
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="flex-grow mt-6">
        {cartData.length === 0 ? (
          <p className="text-center py-10 text-sm sm:text-base">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div
                key={index}
                className="py-5 border-t border-b flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
                  <img
                    className="w-16 sm:w-20 flex-shrink-0 rounded-md shadow-sm"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg font-medium sm:truncate sm:whitespace-nowrap">
                      {productData.name}
                    </p>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-1 text-xs sm:text-sm">
                      <p className="text-[#b97111] font-semibold whitespace-nowrap">
                        {currency} {productData.price}
                      </p>
                      {productData.sizes && productData.sizes.length > 0 && item.size !== 'default' && (
                        <span className="border bg-[#f2ece5] px-2 py-0.5 rounded text-[11px] uppercase whitespace-nowrap">
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                    className="text-xl sm:text-3xl px-2 sm:px-3 py-1 sm:py-2 cursor-pointer rounded hover:text-[#b97111] select-none transition"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="text-base sm:text-lg min-w-[28px] text-center select-none">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className="text-xl sm:text-3xl px-2 sm:px-3 py-1 sm:py-2 cursor-pointer rounded hover:text-[#b97111] select-none transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <img
                    src={assets.bin_icon}
                    alt="Remove"
                    className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-12">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="mt-8 cursor-pointer bg-[#5C4033] hover:bg-[#b97111] text-white text-sm px-8 py-3 rounded transition-all duration-300"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
