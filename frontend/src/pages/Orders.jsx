import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)

  const loadOrderData = async () => {
    try {
      if (!token) return null
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status
            item.payement = order.payement
            item.payementMethod = order.payementMethod
            item.date = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="pt-16 bg-[#fafaf7] min-h-screen px-4 sm:px-8 text-[#5C4033] relative">
      <div className="text-3xl font-semibold mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
          <p className="text-[#b97111] text-xl font-semibold">Loading...</p>
        </div>
      )}

      <div className="flex flex-col gap-6 pointer-events-auto">
        {orderData.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-16">You have no orders yet.</p>
        )}

        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-sm border border-[#b97111] p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-5 text-sm md:text-base w-full md:w-auto">
              <img
                className="w-20 h-20 object-cover rounded-md border border-[#5C4033]"
                src={item.image[0]}
                alt={item.name}
              />
              <div className="flex flex-col justify-between">
                <p className="font-semibold">{item.name}</p>
                <div className="flex flex-wrap gap-4 mt-1 text-[#5C4033]">
                  <p>
                    {currency} {item.price.toFixed(2)}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  {item.size && item.size !== 'default' && <p>Size: {item.size}</p>}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: <span>{item.payementMethod}</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 w-full">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full h-3 w-3 ${
                    item.status.toLowerCase() === 'delivered'
                      ? 'bg-green-500'
                      : item.status.toLowerCase() === 'pending'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}
                ></span>
                <p className="text-sm md:text-base font-medium capitalize">{item.status}</p>
              </div>

              <button
                onClick={loadOrderData}
                disabled={loading}
                className={`border border-[#5C4033] hover:border-[#b97111] hover:bg-[#b97111] hover:text-white text-[#5C4033] rounded-md px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  loading ? 'cursor-not-allowed opacity-60' : ''
                }`}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
