import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const Logout = () => {

    const navigate=useNavigate()
    const cookies = new Cookies(null, { path: '/'});

    useEffect(()=>{
        cookies.remove('token') 
        navigate('/login')
    },[])

  return (
    <div>Logout</div>
  )
}

export default Logout