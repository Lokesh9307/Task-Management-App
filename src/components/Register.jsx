import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, ServerUrl } from '../main'
import toast from 'react-hot-toast'

const Register = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const submitHandler =async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${ServerUrl}/users/new`,{
        name,email,password
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={'/'}/>
  return (
    <div className='bg-primarybg w-full h-[91.5vh] text-textColor flex justify-center items-center flex-col'>
      <h1 className='text-textColor text-lg font-semibold'>Sign Up</h1>
            <form className='bg-secondarybg text-black w-[50%] h-auto p-10 rounded-lg flex flex-col justify-between gap-6' 
            onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="name" name="name" id="name" placeholder='Name' required className='p-2' 
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder='Email' required className='p-2' 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder='password' required className='p-2' 
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex items-center justify-around flex-col gap-3'>
                <button to={'/register'} disabled={loading} className='bg-blue-100 py-1 px-3 text-lg rounded-md border-2 border-blue-400 text-black/80 hover:text-black font-medium hover:border-blue-500 duration-500 ease-in-out'>Sign Up</button>
                    <hr className='h-[2px] font-bold bg-black/20 w-full' />
                    <div className='flex flex-col items-center justify-center'>
                        <p>Already have an account?</p>
                        <Link to={'/login'} className='bg-green-100 py-1 px-3 text-lg rounded-md border-2 border-green-400 text-black/80 hover:text-black font-medium hover:border-green-600 duration-500 ease-in-out'>Login</Link>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default Register