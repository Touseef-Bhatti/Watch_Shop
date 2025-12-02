import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext)

  const location = useLocation()
  const isCollectionPage = location.pathname === '/collection'

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 mb-2">
      <nav className="flex items-center justify-between px-5 sm:px-10 py-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} className="w-36 sm:w-40" alt="Lederdorf Logo" />
        </Link>

        {/* Navigation Links - Desktop */}
        <ul className="hidden sm:flex gap-8 text-sm text-[#5C4033] tracking-wide font-medium">
          {['Home', 'Collection', 'About', 'Contact'].map((label, idx) => {
            const to = label === 'Home' ? '/' : `/${label.toLowerCase()}`
            return (
              <NavLink
                key={idx}
                to={to}
                className={({ isActive }) =>
                  `relative pb-1 transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'text-[#b97111] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#b97111]'
                      : 'hover:text-[#b97111]'
                  }`
                }
              >
                {label.toUpperCase()}
              </NavLink>
            )
          })}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5 text-[#5C4033]">
          {/* Search (only on collection) - visible on all screen sizes */}
          {isCollectionPage && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer hover:opacity-70 transition"
              alt="Search"
            />
          )}

          {/* Profile Icon */}
          <div className="relative">
            <img
              onClick={() => {
                if (token) {
                  setDropdownOpen(!dropdownOpen)
                } else {
                  navigate('/login')
                }
              }}
              src={assets.profile_icon}
              className="w-5 cursor-pointer hover:opacity-70 transition"
              alt="Profile"
            />

            {/* Dropdown */}
            {token && dropdownOpen && (
              <div className="absolute right-0 top-8 z-30">
                <div className="flex flex-col gap-2 w-44 py-3 px-5 bg-[#f9f6f2] text-[#5C4033] rounded shadow-lg">
                  <p
                    onClick={() => {
                      navigate('/profile')
                      setDropdownOpen(false)
                    }}
                    className="cursor-pointer hover:text-[#b97111]"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate('/orders')
                      setDropdownOpen(false)
                    }}
                    className="cursor-pointer hover:text-[#b97111]"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-[#b97111]"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 hover:opacity-70 transition"
              alt="Cart"
            />
            <span className="absolute -right-2 -bottom-2 w-4 h-4 bg-[#5C4033] text-white text-[9px] flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Hamburger - Mobile */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 sm:hidden cursor-pointer"
            alt="Menu"
          />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 text-[#5C4033]">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 mb-6 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Close" />
            <p className="text-sm font-medium">Back</p>
          </div>

          {['Home', 'Collection', 'About', 'Contact'].map((label, idx) => {
            const to = label === 'Home' ? '/' : `/${label.toLowerCase()}`
            return (
              <NavLink
                key={idx}
                to={to}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-4 border-b border-gray-200 text-base transition ${
                    isActive ? 'text-[#b97111] font-semibold' : 'text-[#5C4033]'
                  } hover:text-[#b97111]`
                }
              >
                {label}
              </NavLink>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Navbar