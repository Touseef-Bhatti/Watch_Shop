import React, { useEffect, useState } from 'react'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const currency = 'Rs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } }) 
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (!list) return <p className="text-center mt-10">Loading Products...</p>
  return (
    <>
      <p className="mb-4 text-lg font-semibold">All Products List</p>

      {/* Table header - hidden on small screens */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium text-gray-700 mb-2">
        <div>Image</div>
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div className="text-center">Action</div>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-3 md:p-2 grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 md:gap-2"
          >
            <img className="w-20 h-20 object-cover rounded-md mx-auto md:mx-0" src={item.image[0]} alt={item.name} />

            <div className="text-center md:text-left font-semibold text-base md:text-sm">{item.name}</div>

            <div className="text-center md:text-left text-gray-600 text-sm">{item.category}</div>

            <div className="text-center md:text-left text-gray-800 font-medium text-sm">
              {currency} {item.price}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              {/* <button
                onClick={() => navigate(`/edit/${item._id}`)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              >
                Edit
              </button> */}
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
                    removeProduct(item._id)
                  }
                }}
                className="text-red-600 cursor-pointer hover:text-red-800 font-bold text-xl md:text-lg transition-colors duration-200"
                aria-label={`Remove product ${item.name}`}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
