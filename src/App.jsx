import { useEffect, useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Context, ServerUrl } from './main'
import { useContext } from 'react'

function App() {

  const {setUser,setIsAuthenticated,setLoading} = useContext(Context);

useEffect(()=>{
  setLoading(true);
  axios.get(`${ServerUrl}/users/me`,{
    withCredentials:true,
  })
  .then((res)=>{
    setUser(res.data.user);
    setIsAuthenticated(true);
    setLoading(false);
  })
  .catch((error)=>{
    setUser({});
    setIsAuthenticated(false);
    setLoading(false);
  })
},[])
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
