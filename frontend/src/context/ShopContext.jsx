import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs';
    const delivery_fee = 250;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')

   const addToCart = async (itemId, size) => {
        const product = products.find((p) => p._id === itemId);

        if (!product) {
            toast.error('Product not found');
            return;
        }

        // If product has sizes, ensure a size is selected
        if (product.sizes && product.sizes.length > 0 && !size) {
            toast.error('Select Product Size');
            return;
        }

        // Use "default" as size key if product has no sizes
        const selectedSize = (product.sizes && product.sizes.length > 0) ? size : 'default';

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][selectedSize]) {
                cartData[itemId][selectedSize] += 1;
                } else {
                cartData[itemId][selectedSize] = 1;
                }
        } else {
                cartData[itemId] = {};
                cartData[itemId][selectedSize] = 1;
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            } 
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) =>{
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            } 
        }
        return totalAmount; 
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not fetch products");
        }
    }

    const getUserCart = useCallback(async (token) => {
        try {
            if (!token) return;
            if (!backendUrl) {
                console.error('Backend URL is not configured. Please set VITE_BACKEND_URL in your .env file');
                return;
            }
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})

            if (response.data.success) {
                setCartItems(response.data.cartData || {})
            }
        } catch (error) {
            console.log(error);
            // Don't show error toast if user is not logged in or if it's a 404 (backend not running)
            if (error.response?.status === 404) {
                console.error('Backend not found. Make sure backend server is running on', backendUrl);
            } else if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || error.message)
            }
        }
    }, [backendUrl])


    useEffect(() => {
        getProductsData()
    },[])


    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            const savedToken = localStorage.getItem('token')
            setToken(savedToken)
            getUserCart(savedToken)
        }
    }, [])

    // Load cart when token changes
    useEffect(() => {
        if(token){
            getUserCart(token)
        }
    }, [token, getUserCart])



    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, 
        getCartCount, setCartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token,
        getUserCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;