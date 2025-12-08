import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/context'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(location.pathname.includes('collection'))
  }, [location])

  if (!(showSearch && visible)) return null

  return (
    <div className="flex flex-col items-center max-w-md mx-auto my-6 px-4">
      <div className="flex items-center w-full border-b border-[#D4AF37] py-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none text-[#0F172A] placeholder-[#D4AF37] text-base"
          autoFocus
        />
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 opacity-60 cursor-pointer hover:opacity-90 transition"
        />
      </div>
      <button
        onClick={() => setShowSearch(false)}
        className="mt-3 text-sm text-[#D4AF37] hover:text-[#0F172A] cursor-pointer focus:outline-none"
        aria-label="Close search"
      >
        Close
      </button>
    </div>
  )
}

export default SearchBar
