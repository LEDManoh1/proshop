import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, Mail, ShieldCheck, ShieldAlert, Edit, Trash2, Users } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className='pb-20'>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-3'>
          <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
            <Users size={28} />
          </div>
          <h1 className='text-3xl font-black text-gray-900'>System Users</h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>User ID</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Name</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Email</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center'>Admin Role</th>
                  <th className='px-6 py-4'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {users.map((user) => (
                  <tr key={user._id} className='hover:bg-gray-50/50 transition-colors'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-400'>#{user._id.substring(0, 8)}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold uppercase'>
                          {user.name.charAt(0)}
                        </div>
                        <span className='text-sm font-bold text-gray-900 transition-colors group-hover:text-primary'>{user.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <a href={`mailto:${user.email}`} className='inline-flex items-center text-gray-500 hover:text-primary transition-colors'>
                        <Mail size={14} className='mr-1.5' />
                        {user.email}
                      </a>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      {user.isAdmin ? (
                        <span className='inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100'>
                          <ShieldCheck size={12} className='mr-1' /> Admin
                        </span>
                      ) : (
                        <span className='inline-flex items-center px-3 py-1 bg-gray-50 text-gray-400 text-xs font-bold rounded-full border border-gray-100'>
                          <ShieldAlert size={12} className='mr-1' /> User
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end space-x-2'>
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className='p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300'
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
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
      )}
    </div>
  )
}

export default UserListScreen
