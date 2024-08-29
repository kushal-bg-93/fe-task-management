import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../utils/store'
import { setModal } from '../utils/projectSlice'
import { BACKEND_URL } from '../utils/constants'
import Cookies from 'universal-cookie'
import CheckLogin from './CheckLogin'
import Loader from './Loader'

const Project = () => {
    const modalStatus=useSelector(store=>store.project)
    const dispatch=useDispatch()
    const projectName=useRef(null)
    const [project,setProject]=useState(null)
    const [loader,setLoader]=useState(false)

    useEffect(()=>{
        getProject()
    },[modalStatus])


    const cookies = new Cookies(null, { path: '/'});
    let token=cookies.get('token')

    const addProject=async()=>{
        setLoader(true)
        const addPrjct=await fetch(BACKEND_URL+'/admin/create-project',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'authorization': token
            },
            body:JSON.stringify({
                "name":projectName?.current?.value
            })
        })
        const data=await addPrjct.json()
        // console.log('This is data',data)
        setLoader(false)
        if(data?.message=="Success"){
            dispatch(setModal())
        }
    }

    const getProject=async()=>{
        setLoader(true)
        const project=await fetch(BACKEND_URL+'/admin/view-project',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
        })

        setLoader(false)
        const data=await project.json();

        setProject(data?.result?.data)
    }

  return (
    <div className='overflow-x-hidden'>
        {
            loader?<Loader/>:""
        }
        <CheckLogin/>
        {modalStatus?.showModal && <div>
            <div className="w-[40%] border border-slate-300 absolute bg-white p-4 rounded-md shadow-2xl translate-x-[-50%] translate-y-[-50%] top-[30%] left-[50%] flex items-center text-center z-10">
                <button className='text-sm' onClick={()=>dispatch(setModal())}>x</button>
                <input type="text" ref={projectName} className='p-2 border border-slate-300 rounded-md w-[80%] text-slate-900 mx-4' placeholder='Enter Project Name'/>
                <button className='bg-slate-900 text-white items-center text-center p-2 rounded-md' onClick={addProject}>+ADD</button>
            </div>
            </div>}
        <div className="p-3">
            <button className='bg-slate-900 text-white p-1 text-[7px] md:text-base md:p-3 rounded-md' onClick={()=>dispatch(setModal())}>+ Create Project</button>
            <div className="md:my-5 my-2">
                <div className="flex flex-col md:flex-row gap-2 w-screen md:gap-10 md:flex-wrap">
                    {
                     project&&project.map(item=>{
                            return (
                                <div className="border border-slate-300 p-4 rounded-md shadow-md w-[80%] md:w-80 align-middle cursor-pointer hover:scale-105 ease-in-out delay-0" key={item._id}>
                                <p className='font-bold text-center'>{item?.name}</p>
                                <hr/>
                                <p className="text-center">{item._id}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Project