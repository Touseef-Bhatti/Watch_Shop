import React, { useState } from 'react'

const NewsletterBox = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    // Here you could call an API to save email or send mail
    // Example: axios.post('/api/newsletter', { email })

    setIsSubmitted(true)
  }

  return (
    <section className="bg-[#f8fafc] py-16 px-6 text-center">
      <div className="max-w-xl mx-auto">

        {!isSubmitted ? (
          <>
            <p className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Subscribe now & get 20% off
            </p>
            <p className="text-[#D4AF37] mt-3 text-sm sm:text-base">
              Be the first to know about new drops, deals & more!
            </p>

            <form
              onSubmit={onSubmitHandler}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-5 py-3 rounded-full border border-[#e5e7eb] outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
              />
              <button
                type="submit"
                className="bg-[#0F172A] hover:bg-[#0b1220] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          </>
        ) : (
          <div className="py-10">
            <p className="text-2xl font-semibold text-[#0F172A]">Thank you for subscribing!</p>
            <p className="text-[#D4AF37] mt-3">Check your inbox for a welcome message.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default NewsletterBox
