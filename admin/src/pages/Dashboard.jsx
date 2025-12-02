import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App' // or '../config' if you move it to config.js
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaCheckCircle,
  FaChartLine
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/dashboard`)
        if (res.data.success) {
          setData(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      }
    }

    fetchDashboardData()
  }, [])

  if (!data) return <p className="text-center mt-10">Loading dashboard...</p>

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-[#f9f9f9]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-6 text-center sm:text-left">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <DashboardCard icon={<FaUsers />} title="Total Users" value={data.totalUsers} />
        <DashboardCard icon={<FaBoxOpen />} title="Total Products" value={data.totalProducts} />
        <DashboardCard icon={<FaClipboardList />} title="Pending Orders" value={data.pendingOrders} />
        <DashboardCard icon={<FaCheckCircle />} title="Completed Orders" value={data.completedOrders} />
      </div>

      {/* Sales Chart */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#5C4033] flex items-center mb-4 justify-center sm:justify-start">
          <FaChartLine className="mr-2" /> Sales Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={salesData.length ? salesData : defaultSalesData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#5C4033" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Reusable card component for dashboard stats
const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-white shadow rounded-lg p-4 sm:p-5 flex items-center space-x-4">
    <div className="text-3xl text-[#5C4033]">{icon}</div>
    <div>
      <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
      <h2 className="text-lg sm:text-xl font-semibold">{value}</h2>
    </div>
  </div>
)

// Optional fallback sales data
const defaultSalesData = [
  { month: 'Apr', sales: 4000 },
  { month: 'May', sales: 4500 },
  { month: 'Jun', sales: 4700 },
  { month: 'Jul', sales: 4200 },
  { month: 'Aug', sales: 4900 },
  { month: 'Sep', sales: 5300 },
]

export default Dashboard