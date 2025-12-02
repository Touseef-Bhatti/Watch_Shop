import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7efe5] to-[#e9d8c6] px-4">
      <div className="bg-white shadow-lg rounded-xl px-8 py-8 max-w-md w-full
                      sm:px-10 sm:py-10
                      md:max-w-lg
                      ">
        <h1 className="text-3xl font-extrabold text-[#5C4033] mb-8 text-center tracking-wide">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#5C4033] mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-[#ca896b] px-4 py-3
                         text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#b97111]
                         transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#5C4033] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-[#ca896b] px-4 py-3
                         text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#b97111]
                         transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#5C4033] hover:bg-[#b97111] active:bg-[#924d0b]
                       text-white font-semibold py-3 rounded-lg
                       transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login