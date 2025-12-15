import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl, getUserCart} = useContext(ShopContext);

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!backendUrl) {
      toast.error('Backend URL is not configured. Please set VITE_BACKEND_URL in your .env file');
      return;
    }
    
    try {     
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + "/api/user/register", {name, email, password})
        if (response.data.success) {
          const newToken = response.data.token
          setToken(newToken)
          localStorage.setItem('token', newToken)
          // Load user cart after registration
          getUserCart(newToken)
          toast.success('Account created successfully!')
          // Clear form
          setName('')
          setEmail('')
          setPassword('')
        }else{
          toast.error(response.data.message || 'Registration failed')
        }
      }else{
        const response = await axios.post(backendUrl + "/api/user/login", {email, password})
        if (response.data.success) {
          const newToken = response.data.token
          setToken(newToken)
          localStorage.setItem('token', newToken)
          // Load user cart after login
          getUserCart(newToken)
          toast.success('Login successful!')
          // Clear form
          setEmail('')
          setPassword('')
        }else{
          toast.error(response.data.message || 'Login failed')
        }
      }

    } catch (error) {
      console.log(error);
      // Handle axios error response
      if (error.response?.status === 404) {
        toast.error('Backend server not found. Make sure backend is running on ' + backendUrl);
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf7] px-4">
      <form 
        onSubmit={onSubmitHandler} 
        className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-[#b97111] text-[#5C4033]"
      >
        <h2 className="text-4xl font-prata font-semibold mb-8 text-center">
          {currentState}
        </h2>

        {currentState === 'Sign Up' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full mb-4 px-4 py-3 border border-[#5C4033] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b97111] transition"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-3 border border-[#5C4033] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b97111] transition"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
          className="w-full mb-6 px-4 py-3 border border-[#5C4033] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b97111] transition"
        />

        <div className="flex justify-between text-sm mb-6 text-[#7f6a53]">
          <button
            type="button"
            className="underline hover:text-[#b97111] transition cursor-pointer"
            onClick={() => toast.info('Password reset feature coming soon!')}
          >
            Forgot your password?
          </button>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="underline hover:text-[#b97111] cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="underline hover:text-[#b97111] cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-[#5C4033] hover:bg-[#b97111] text-white py-3 rounded-md font-semibold transition-colors duration-300"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
