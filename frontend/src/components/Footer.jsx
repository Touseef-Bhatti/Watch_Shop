import React from 'react'
import { assets } from '../assets/assets'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#f8fafc] text-[#0F172A] pt-20 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        <div>
          <img src={assets.logo} alt="Lederdorf" className="w-36 mb-4" />
          <p className="text-sm leading-relaxed max-w-md">
            Crafted timepieces for modern life. From daily wear to special occasions, our watches balance precision and style.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-5">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#D4AF37] transition cursor-pointer">Home</li>
            <li className="hover:text-[#D4AF37] transition cursor-pointer">About</li>
            <li className="hover:text-[#D4AF37] transition cursor-pointer">Delivery</li>
            <li className="hover:text-[#D4AF37] transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#D4AF37]" />
              <span>+92 307 6258937</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#D4AF37]" />
              <span>leder.dorf@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e5e7eb] pt-6 pb-4 text-center text-xs sm:text-sm text-[#6b7280]">
        © 2025 lederdorf.com — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
