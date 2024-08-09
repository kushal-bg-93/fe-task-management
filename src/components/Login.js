import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import {BACKEND_URL} from '../utils/constants'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const email=useRef(null)
    const password=useRef(null)
    const role=useRef(null)
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cookies = new Cookies(null, { path: '/',expires: new Date(Date.now()+259200000) });

    const handleLoginClick=async(e)=>{
        console.log('email :',email.current.value,"password : ",password.current.value,"role: ",role.current.value)

        const loginResult=await fetch(BACKEND_URL+'/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email?.current?.value,
                password:password?.current?.value,
                role:role?.current?.value
            })
        })

        const data=await loginResult.json();

        // console.log('this is data',data)
        if(data?.error){
            setError(data?.error)
        }  
        else {
            
            setError(null)
            dispatch(addUser({role:data?.result?.role,userId:data?.result?._id}))
            cookies.set('token',data?.result?.token?.token)
            cookies.set('role',data?.result?.role)
            cookies.set('userId',data?.result?._id)
            navigate('/')
        }
    }
    useEffect(()=>{
        checkToken();
    },[])

    const checkToken=async()=>{
        if(cookies.get('token')) navigate("/")
    }

  return (
    <div>
        <Header/>
        <div className="md:w-4/12 w-[90%] p-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute border border-slate-300 shadow-md shadow-slate-300 rounded-md">
        {/* <h1 className='font-bold text-slate-900 text-center'>LOGIN</h1> */}
        <form action="" className='m-2 flex flex-col justify-center' onSubmit={(e)=>e.preventDefault()}>

            <input type="text" ref={email} name='email' placeholder='something@example.com' className='p-2 rounded-md border border-slate-300 text-slate-900 w-full my-2'  />

            <input type="password" ref={password} name='password' placeholder='**********' className='p-2 rounded-md border border-slate-300 w-full my-2 text-slate-900'/>
            
            <select name="Role" ref={role} id="role" className='my-2 p-2 border border-slate-300 rounded-md text-slate-900'>
                
                <option className='p-4' value="admin">Admin</option>
                
                <option className='p-4' value="user">User</option>
            
            </select>

            <button className='text-white bg-slate-900 rounded-md p-2 my-2' onClick={handleLoginClick}>LOGIN</button>
            {error&&<p className='text-red-700 text-center font-extrabold'>{error}</p>}
        </form>
        </div>
        </div>
  )
}

export default Login