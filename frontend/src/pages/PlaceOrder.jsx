import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/context'
import api from '../lib/api'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const [showBankAlert, setShowBankAlert] = useState(false)

  const {
    navigate,
    cartItems,
    setCartItems,
    delivery_fee,
    getCartAmount,
    products,
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (method === 'bank') {
      setShowBankAlert(true)
      setTimeout(() => {
        setShowBankAlert(false)
      }, 2000)
      return
    }

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      const response = await api.post('/api/order/place', orderData)

      if (response.data.success) {
        toast.success('Your order has been placed successfully!')
        setCartItems({})
        navigate('/orders')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      {/* Overlay alert box */}
      {showBankAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg border border-[#D4AF37] text-[#0F172A] text-center w-[90%] max-w-sm">
            <p className="text-lg font-medium">Bank transfer is currently unavailable.</p>
          </div>
        </div>
      )}

      {/* Main form */}
      <form
        onSubmit={onSubmitHandler}
        className={`flex flex-col sm:flex-row justify-between gap-6 pt-6 sm:pt-14 min-h-[80vh] bg-[#0F172A] text-white px-4 sm:px-8`}
      >
        {/* Left side - delivery info */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl mb-3">
            <Title text1={'DELIVERY '} text2={'INFORMATION'} />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            type="email"
            placeholder="Email Address"
          />

          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            type="text"
            placeholder="Street"
          />

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="number"
              placeholder="Zip Code"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-[#e5e7eb] rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-[#e5e7eb] rounded py-2 px-3 w-full  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            type="tel"
            placeholder="Phone"
          />
        </div>

        {/* Right side - payment */}
        <div className="mt-8 sm:mt-0 min-w-[300px] w-full max-w-md flex flex-col gap-6">
          <CartTotal />
          <div>
            <Title text1={'PAYMENT '} text2={'METHOD'} />
            <div className="flex gap-4 flex-col lg:flex-row mt-4">
              <div
                onClick={() => setMethod('bank')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded select-none
                  ${
                    method === 'bank'
                      ? 'border-[#D4AF37] bg-[#0F172A]/10'
                      : 'border-[#e5e7eb] hover:border-[#D4AF37]'
                  }`}
              >
                <span
                  className={`min-w-4 min-h-4 border-2 rounded-full flex items-center justify-center
                    ${
                      method === 'bank'
                        ? 'border-[#D4AF37] bg-[#D4AF37]'
                        : 'border-[#e5e7eb]'
                    }`}
                >
                  {method === 'bank' && <span className="block w-2 h-2 bg-white rounded-full"></span>}
                </span>
                <p className="text-white text-sm font-medium">BANK TRANSFER</p>
              </div>

              <div
                onClick={() => setMethod('cod')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded select-none
                  ${
                    method === 'cod'
                      ? 'border-[#D4AF37] bg-[#0F172A]/10'
                      : 'border-[#e5e7eb] hover:border-[#D4AF37]'
                  }`}
              >
                <span
                  className={`min-w-4 min-h-4 border-2 rounded-full flex items-center justify-center
                    ${
                      method === 'cod'
                        ? 'border-[#D4AF37] bg-[#D4AF37]'
                        : 'border-[#e5e7eb]'
                    }`}
                >
                  {method === 'cod' && <span className="block w-2 h-2 bg-white rounded-full"></span>}
                </span>
                <p className="text-white text-sm font-medium">CASH ON DELIVERY</p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 cursor-pointer bg-[#D4AF37] text-[#0F172A] text-sm px-8 py-3 rounded hover:bg-[#e0be59] transition-colors duration-300"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
