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
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}


// Placing order using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "STRIPE",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        res.status(201).json({success: true, message: 'Order initiated'})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

// All orders for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        const normalized = orders.map(o => {
            const obj = o.toObject()
            obj.payment = obj.payment ?? obj.payement
            obj.paymentMethod = obj.paymentMethod ?? obj.payementMethod
            return obj
        })
        res.status(200).json({success: true, orders: normalized})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
    
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})
        const normalized = orders.map(o => {
            const obj = o.toObject()
            obj.payment = obj.payment ?? obj.payement
            obj.paymentMethod = obj.paymentMethod ?? obj.payementMethod
            return obj
        })
        res.status(200).json({success: true, orders: normalized})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
    
}

// Update order status from admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.status(200).json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
    
}

// Update payment status of an order
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { $set: { payment: paymentStatus, payement: paymentStatus } });
    res.status(200).json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, updatePaymentStatus}
