import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Package, Plus, Edit, Trash2, Tag, Box } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div className='pb-20'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-8'>
        <div className='flex items-center space-x-3 mb-4 sm:mb-0'>
          <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
            <Package size={28} />
          </div>
          <h1 className='text-3xl font-black text-gray-900'>Products Inventory</h1>
        </div>
        <button
          onClick={createProductHandler}
          className='flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95'
        >
          <Plus size={20} />
          <span>Create Product</span>
        </button>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='space-y-8'>
          <div className='bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-gray-50 border-b border-gray-100'>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Product ID</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Product Info</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Price</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Category</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Brand</th>
                    <th className='px-6 py-4'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-50'>
                  {products.map((product) => (
                    <tr key={product._id} className='hover:bg-gray-50/50 transition-colors group'>
                      <td className='px-6 py-4 text-sm font-medium text-gray-400'>#{product._id.substring(0, 8)}</td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-4'>
                          <div className='w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden'>
                            <img src={product.image} alt={product.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                          </div>
                          <span className='text-sm font-bold text-gray-900'>{product.name}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-sm font-black text-gray-900'>
                        <span className='inline-flex items-center'>
                          <Tag size={12} className='mr-1.5 text-gray-400' />
                          ${product.price}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-md border border-blue-100'>
                          {product.category}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-wider rounded-md border border-purple-100'>
                          <Box size={10} className='mr-1' />
                          {product.brand}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <div className='flex items-center justify-end space-x-2'>
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className='p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300'
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-8'>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductListScreen
