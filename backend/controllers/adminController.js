import UserModel from '../models/userModel.js';
import ProductModel from '../models/productModel.js';
import OrderModel from '../models/orderModel.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const [totalUsers, totalProducts, orders] = await Promise.all([
      UserModel.countDocuments(),
      ProductModel.countDocuments(),
      OrderModel.find()
    ]);

    const pendingStatuses = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery']

    const pendingOrders = orders.filter(order => pendingStatuses.includes(order.status)).length
    const completedOrders = orders.filter(order => order.status === 'Delivered').length

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      pendingOrders,
      completedOrders
    });

  } catch (err) {
        console.log(error);
        res.json({success: false, message: error.message})  
  }
};
