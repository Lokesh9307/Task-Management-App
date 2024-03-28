import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, ServerUrl } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    const LogoutHandler =async ()=>{
      setLoading(true);
        try {
          await axios.get(`${ServerUrl}/users/logout`,
          {
            withCredentials:true,
          }
          );
          toast.success("Logout Sucessfully");
          setIsAuthenticated(false);
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong!");
          setIsAuthenticated(true)
          setLoading(false);
        }
      };
  return (
    <div className='bg-primarybg text-textColor flex justify-around items-center p-3 w-full h-auto border-b-2'>
        <div className='flex justify-between items-center w-full h-auto '>  
            <div>
            <h2 className='text-3xl'>Task Manage</h2>
            </div>
            <div className='flex justify-between text-lg gap-4'>
            <Link to={'/'} className=' rounded-md p-1 px-2 duration-300 ease-out'>Home</Link>
            <Link to={'/profile'} className=' rounded-md p-1 px-2 duration-300 ease-out'>Profile</Link>
            {
                isAuthenticated?
                <button disabled={loading} className='' onClick={LogoutHandler}>Logout</button>
                :<Link to={'/login'} className=' rounded-md p-1 px-2 duration-300 ease-out'>Login</Link>
            }
            </div>
        </div>
    </div>
  )
}

export default Header