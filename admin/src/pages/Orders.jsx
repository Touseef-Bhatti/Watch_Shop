import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const currency = 'Rs'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPhoneAlt,
  FaClipboardList
} from 'react-icons/fa'

const statusColors = {
  'Order Placed': 'bg-yellow-200 text-yellow-800',
  Packing: 'bg-orange-200 text-orange-800',
  Shipped: 'bg-blue-200 text-blue-800',
  'Out for delivery': 'bg-purple-200 text-purple-800',
  Delivered: 'bg-green-200 text-green-800'
}

const paymentColors = {
  Completed: 'bg-green-200 text-green-800',
  Pending: 'bg-red-200 text-red-800'
}

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  // Track which order's status menu is open
  const [editingStatusFor, setEditingStatusFor] = useState(null)
  // Track which order's payment menu is open
  const [editingPaymentFor, setEditingPaymentFor] = useState(null)

  // Refs to detect clicks outside menus
  const containerRef = useRef(null)

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  // Close menus if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setEditingStatusFor(null)
        setEditingPaymentFor(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Toggle status menu for specific order
  const toggleStatusMenu = (orderId) => {
    setEditingStatusFor((prev) => (prev === orderId ? null : orderId))
    // Close payment menu if open
    setEditingPaymentFor(null)
  }

  // Toggle payment menu for specific order
  const togglePaymentMenu = (orderId) => {
    setEditingPaymentFor((prev) => (prev === orderId ? null : orderId))
    // Close status menu if open
    setEditingStatusFor(null)
  }

  // Update order status API call
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Status updated')
        setEditingStatusFor(null)
        fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Update payment status API call
  const updatePayment = async (orderId, newPaymentStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/payment-status',
        { orderId, paymentStatus: newPaymentStatus }, // Ensure backend supports this route & payload
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Payment status updated')
        setEditingPaymentFor(null)
        fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div ref={containerRef} className="p-6 bg-[#fafaf7] min-h-screen">
      <h2 className="text-3xl font-bold text-[#5C4033] mb-8 text-center sm:text-left">
        Orders Overview
      </h2>

      <div className="flex flex-col gap-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm border border-gray-200
                       hover:shadow-md transition-shadow duration-300 p-6"
          >
            {/* Left side: Items + Address */}
            <div className="sm:w-2/3 flex flex-col gap-4 border-b sm:border-b-0 sm:border-r border-gray-100 pr-0 sm:pr-6 pb-4 sm:pb-0">
              <div className="flex items-center gap-3">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-10 h-10"
                />
                <div className="flex flex-wrap gap-1 text-sm text-[#5C4033]">
                  {order.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block bg-[#f0e6dc] rounded px-2 py-1 font-semibold"
                    >
                      {item.name} x {item.quantity}
                      {item.size && item.size !== 'default' && ` (${item.size})`}
                      {i !== order.items.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[#7a5a3c] font-medium leading-snug">
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} -{' '}
                  {order.address.zipcode}
                </p>
                <p className="flex items-center gap-1">
                  <FaPhoneAlt className="inline-block" /> {order.address.phone}
                </p>
              </div>
            </div>

            {/* Right side: Order details & controls */}
            <div className="sm:w-1/3 flex flex-col justify-between pl-0 sm:pl-6 relative">
              <div className="flex flex-col gap-3 text-[#5C4033] text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <FaClipboardList className="text-[#b97111]" />
                  <span>
                    <b>Items:</b> {order.items.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#b97111]" />
                  <span>
                    <b>Date:</b>{' '}
                    {new Date(order.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div>
                  <b>Payment Method:</b> {order.paymentMethod}
                </div>

                {/* Payment status with toggle menu */}
                <div className="flex items-center gap-2 relative">
                  <button
                    onClick={() => togglePaymentMenu(order._id)}
                    className={`px-3 py-1 rounded-full font-semibold cursor-pointer
                               ${order.payment
                                 ? paymentColors.Completed
                                 : paymentColors.Pending}
                               hover:brightness-90 transition`}
                  >
                    {order.payment ? 'Completed' : 'Pending'}
                  </button>

                  {editingPaymentFor === order._id && (
                    <ul
                      className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-20"
                    >
                      {['Completed', 'Pending'].map((status) => (
                        <li
                          key={status}
                          onClick={() =>
                            updatePayment(order._id, status === 'Completed')
                          }
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100
                            ${
                              (status === 'Completed' && order.payment) ||
                              (status === 'Pending' && !order.payment)
                                ? 'font-bold underline'
                                : ''
                            }`}
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Order status with toggle menu */}
                <div className="mt-3 relative">
                  <button
                    onClick={() => toggleStatusMenu(order._id)}
                    className={`px-4 py-2 rounded-full font-semibold cursor-pointer
                               ${statusColors[order.status] || 'bg-gray-200 text-gray-700'}
                               hover:brightness-90 transition w-full text-center`}
                  >
                    {order.status}
                  </button>

                  {editingStatusFor === order._id && (
                    <ul
                      className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg"
                      style={{ minWidth: '150px' }}
                    >
                      {Object.keys(statusColors).map((status) => (
                        <li
                          key={status}
                          onClick={() => updateStatus(order._id, status)}
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100
                                     ${statusColors[status]} ${
                            status === order.status ? 'font-bold underline' : ''
                          }`}
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="text-xl font-bold mt-3">
                  {currency} {order.amount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
