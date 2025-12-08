import React, { useContext } from 'react'
import { ShopContext } from '../context/context'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
        <div className="relative">
          <img
            src={image[0]}
            alt={name}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-3">
          <p className="text-sm text-[#0F172A] truncate">{name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm font-semibold text-[#D4AF37]">{currency} {price}</p>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-[10px] text-[#6b7280]">In stock</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
