import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      desc: 'Hassle-free swaps if it’s not the perfect fit'
    },
    {
      icon: assets.quality_icon,
      title: '7 Days Return Policy',
      desc: 'Changed your mind? Send it back within 7 days'
    },
    {
      icon: assets.support_img,
      title: 'Best Customer Support',
      desc: 'We are here to help anytime, every step of the way'
    }
  ]

  return (
    <section className="bg-[#fafaf7] py-16 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#e2dcd5] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
          >
            <img src={policy.icon} alt={policy.title} className="w-14 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{policy.title}</h3>
            <p className="text-sm text-[#b97111]">{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
