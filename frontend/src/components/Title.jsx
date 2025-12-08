import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-[#0F172A]">
        {text1} <span className="text-[#D4AF37] font-medium">{text2}</span>
      </p>
    </div>
  )
}

export default Title
