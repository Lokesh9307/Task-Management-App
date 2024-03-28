import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from './Loader';

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user } = useContext(Context);
  console.log(user)
  return (
    loading ? <Loader /> : (
      <div className='text-textColor bg-primarybg w-full h-[91.5vh] flex justify-center items-center flex-col'>
        <h1>About, {user?.name}</h1>
        <div className='w-[400px] h-[250px] bg-secondarybg text-primarybg flex justify-center items-center flex-col rounded-xl'>
          <div>
            <div className='flex gap-5'><h2>Name:</h2><p>{user?.name}</p></div>
            <div className='flex gap-5'><h2>Email:</h2><p>{user?.email}</p></div>
          </div>
        </div>
      </div>
    )
  )
}

export default Profile