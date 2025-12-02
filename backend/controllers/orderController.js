import { response } from 'express';
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


// Placing order using COD
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            payementMethod: "COD",
            payement: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


// Placing order using Stripe
const placeOrderStripe = async (req, res) => {
    
}

// All orders for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}

// Update order status from admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}

// Update payment status of an order
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    // Update the payment status (assuming your schema uses 'payement' field)
    await orderModel.findByIdAndUpdate(orderId, { payement: paymentStatus });

    res.json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, updatePaymentStatus}