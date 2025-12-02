import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaPlusCircle, FaList, FaShoppingBag } from 'react-icons/fa'

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <FaTachometerAlt className='w-5 h-5' />, label: 'Dashboard' },
    { to: '/add', icon: <FaPlusCircle className='w-5 h-5' />, label: 'Add Items' },
    { to: '/list', icon: <FaList className='w-5 h-5' />, label: 'List Items' },
    { to: '/orders', icon: <FaShoppingBag className='w-5 h-5' />, label: 'Orders' }
  ]

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <div className='hidden md:flex flex-col w-48 min-h-screen border-r border-[#5C4033] bg-white'>
        <nav className='flex flex-col mt-10 gap-4 px-4'>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-l border border-[#5C4033] border-r-0 transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#5C4033] text-white font-semibold'
                    : 'text-[#5C4033] hover:bg-[#FBE4DC]'
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className='fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-around border-t border-[#5C4033] bg-white'>
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 text-sm transition-colors duration-200 ${
                isActive
                  ? 'text-[#5C4033] font-semibold'
                  : 'text-gray-600 hover:text-[#5C4033]'
              }`
            }
            title={label}
          >
            {icon}
            <span className='text-xs mt-1'>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar