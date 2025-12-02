import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      )
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let sorted = [...filterProducts]

    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilter()
        return
    }

    setFilterProducts(sorted)
  }

  useEffect(() => {
    applyFilter()
  }, [category, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <section className="bg-[#fafaf7] py-10 px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="min-w-[180px]">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="mb-3 text-xl flex items-center justify-between sm:justify-start gap-2 cursor-pointer text-[#5C4033] font-semibold"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transition-transform duration-200 ${
                showFilter ? 'rotate-90' : ''
              }`}
              src={assets.dropdown_icon}
              alt="dropdown"
            />
          </p>

          {/* Category Filter */}
          <div
            className={`bg-white border border-[#e2dcd5] rounded-lg p-5 transition-all duration-300 ${
              showFilter ? 'block' : 'hidden sm:block'
            }`}
          >
            <p className="mb-4 text-sm font-medium text-[#5C4033]">
              CATEGORIES
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#5C4033]">
              {['Watch'].map((cat) => (
                <label key={cat} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="w-3 h-3 cursor-pointer accent-[#5C4033]"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product List */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-[#d6cfc7] rounded px-3 py-1 text-sm text-[#5C4033] bg-white focus:outline-none"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collection