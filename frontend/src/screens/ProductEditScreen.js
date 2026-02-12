import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, Package, Tag, Image as ImageIcon, Briefcase, Layout, FileText, Upload, Save } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  const inputClasses = 'w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-2 ml-1'

  return (
    <div className='py-8'>
      <Link
        to='/admin/productlist'
        className='inline-flex items-center space-x-2 text-primary font-bold hover:translate-x-[-4px] transition-transform duration-300 mb-8'
      >
        <ArrowLeft size={18} />
        <span>Back to Inventory</span>
      </Link>

      <FormContainer>
        <div className='flex items-center space-x-3 mb-8'>
          <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
            <Package size={24} />
          </div>
          <h1 className='text-3xl font-black text-gray-900'>Edit Product</h1>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className='space-y-6'>
            <div>
              <label className={labelClasses}>Product Name</label>
              <div className='relative'>
                <Package className='absolute left-4 top-3.5 text-gray-400' size={18} />
                <input
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className={labelClasses}>Price ($)</label>
                <div className='relative'>
                  <Tag className='absolute left-4 top-3.5 text-gray-400' size={18} />
                  <input
                    type='number'
                    placeholder='0.00'
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>Stock Count</label>
                <div className='relative'>
                  <Layout className='absolute left-4 top-3.5 text-gray-400' size={18} />
                  <input
                    type='number'
                    placeholder='0'
                    value={countInStock}
                    required
                    onChange={(e) => setCountInStock(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Product Image URL</label>
              <div className='relative'>
                <ImageIcon className='absolute left-4 top-3.5 text-gray-400' size={18} />
                <input
                  type='text'
                  placeholder='Enter image URL'
                  value={image}
                  required
                  onChange={(e) => setImage(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div className='mt-4 p-4 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Upload size={20} className='text-gray-400' />
                  <span className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Upload Photo</span>
                </div>
                <input
                  type='file'
                  id='image-file'
                  onChange={uploadFileHandler}
                  className='text-sm text-gray-500 file:bg-white file:border-none file:px-4 file:py-1.5 file:rounded-lg file:font-bold file:text-primary file:mr-2 file:cursor-pointer cursor-pointer'
                />
              </div>
              {uploading && <div className='mt-2'><Loader /></div>}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className={labelClasses}>Brand</label>
                <div className='relative'>
                  <Briefcase className='absolute left-4 top-3.5 text-gray-400' size={18} />
                  <input
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>Category</label>
                <div className='relative'>
                  <Tag className='absolute left-4 top-3.5 text-gray-400' size={18} />
                  <input
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Description</label>
              <div className='relative'>
                <FileText className='absolute left-4 top-3.5 text-gray-400' size={18} />
                <textarea
                  placeholder='Enter description'
                  value={description}
                  required
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClasses} resize-none min-h-[120px]`}
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2'
            >
              <Save size={20} />
              <span>Update Product</span>
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
