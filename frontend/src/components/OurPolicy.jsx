import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    { icon: assets.exchange_icon, title: '2-Year Warranty', desc: 'Manufacturer-backed warranty on all watches' },
    { icon: assets.quality_icon, title: 'Free Sizing', desc: 'Complimentary strap/resizing with every purchase' },
    { icon: assets.support_img, title: 'Premium Support', desc: 'Dedicated assistance for service and care' }
  ]

  return (
    <section className="bg-[#f8fafc] py-16 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
          >
            <img src={policy.icon} alt={policy.title} className="w-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{policy.title}</h3>
            <p className="text-sm text-[#D4AF37]">{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
