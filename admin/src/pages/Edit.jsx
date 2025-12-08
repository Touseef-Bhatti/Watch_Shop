import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Edit = ({ token }) => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Watch')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const sizeOptions = ["38mm", "40mm", "42mm", "44mm", "46mm"]

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/product/single`, { productId });
        if (res.data.success) {
          const p = res.data.product;
          setProduct(p);
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setCategory(p.category);
          setBestseller(!!p.bestseller);
          setSizes(p.sizes || []);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("id", productId)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/update`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Product updated successfully.");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    }
  }

  if (loading) return <p className="mt-6">Loading product...</p>
  if (!product) return <p className="mt-6">Product not found</p>

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col px-4 sm:px-0'>
      <div className='mb-3'>
        <p className='mb-2'>Images</p>
        <div className='flex flex-wrap gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer rounded border' src={image1 ? URL.createObjectURL(image1) : (product.image?.[0] || assets.upload_area)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 cursor-pointer rounded border' src={image2 ? URL.createObjectURL(image2) : (product.image?.[1] || assets.upload_area)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 cursor-pointer rounded border' src={image3 ? URL.createObjectURL(image3) : (product.image?.[2] || assets.upload_area)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 cursor-pointer rounded border' src={image4 ? URL.createObjectURL(image4) : (product.image?.[3] || assets.upload_area)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full mb-2'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-full px-3 py-2 border rounded' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full mb-2'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-full px-3 py-2 border rounded' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mb-2'>
        <div className='flex-1'>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border rounded cursor-pointer' value={category}>
            <option value="Watch">Watch</option>
          </select>
        </div>

        <div className='sm:w-[120px]'>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 border rounded' type="number" placeholder='25' />
        </div>
      </div>

      <div className='mb-2'>
        <p className='mb-2'>Product Sizes (Optional)</p>
        <div className='flex flex-wrap gap-3'>
          {sizeOptions.map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-[#FBE4DC]" : "bg-slate-200"} px-3 py-1 cursor-pointer select-none rounded`}>{size}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 italic text-sm mt-2">Sizes are optional for watches</p>
      </div>

      <div className='flex items-center gap-2 mt-2'>
        <input className='cursor-pointer' type="checkbox" id="bestseller" checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
        <label className='cursor-pointer' htmlFor="bestseller">Mark as Bestseller</label>
      </div>

      <button type='submit' className='w-full sm:w-28 py-3 mt-4 bg-[#5C4033] text-white active:bg-[#b97111] cursor-pointer rounded'>
        Save
      </button>
    </form>
  )
}

export default Edit
