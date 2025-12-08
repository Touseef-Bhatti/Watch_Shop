import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/context';
import api from '../lib/api';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, getUserCart} = useContext(ShopContext);

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {     
      if (currentState === 'Sign Up') {
        const response = await api.post("/api/user/register", {name, email, password})
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
        const response = await api.post("/api/user/login", {email, password})
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
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <form 
        onSubmit={onSubmitHandler} 
        className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-[#D4AF37] text-[#0F172A]"
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
            className="w-full mb-4 px-4 py-3 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-3 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
          className="w-full mb-6 px-4 py-3 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
        />

        <div className="flex justify-between text-sm mb-6 text-[#7f6a53]">
          <button
            type="button"
            className="underline hover:text-[#D4AF37] transition cursor-pointer"
            onClick={() => toast.info('Password reset feature coming soon!')}
          >
            Forgot your password?
          </button>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="underline hover:text-[#D4AF37] cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="underline hover:text-[#D4AF37] cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-[#0F172A] hover:bg-[#D4AF37] hover:text-[#0F172A] text-white py-3 rounded-md font-semibold transition-colors duration-300"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
