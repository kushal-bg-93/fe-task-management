import React, { useRef, useState } from 'react'
import moment from 'moment'
import { BsCalendarDate } from "react-icons/bs";
import { BACKEND_IMAGE_URL, BACKEND_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { IoMdAddCircle,IoMdAdd } from "react-icons/io";
import ViewSubtask from './ViewSubtask';
import { token } from '../../utils/getToken';


const MainTaskContainer = ({userStory}) => {
    const [showSubtask,setShowSubtask]=useState(false)
    const description=useRef(null)
    const addSubtask=async()=>{
        if(description!=="" || description!==null){
            let postSubtask=await fetch(BACKEND_URL+'/common-subtask/create-subtask',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':token
                },
                body:JSON.stringify({
                    title:description?.current?.value,
                    description:"",
                    parentTaskId:userStory?._id,
                    projectId:userStory?.projectId
                })
            })

            postSubtask=await postSubtask.json()
            setShowSubtask(false)
            
        }
    }
  return (
    <div className='w-[80%] border-b-0 border-r border-slate-200 p-4'>
        <div className="flex flex-col">
            <div className="flex justify-between mt-10">
                <h1 className='text-4xl font-extrabold text-slate-900 w-[85%]'>{userStory?.title}</h1>
                <div className='flex gap-2 text-center align-middle items-center w-[15%]'>
                <BsCalendarDate className='text-slate-900'/>
                <p className='text-slate-400 font-bold'>
                    {moment(userStory?.deadline).format('YYYY-MM-DD')}
                </p>
                </div>
            </div>
            <div className="mt-10 text-justify">
                <p className='text-slate-900 font-thin'>{userStory?.description}</p>
            </div>
            <div className="flex flex-col gap-4 mt-10 " name="subtask">
                <div className="flex justify-between items-center relative">
                    <h3 className='font-bold text-slate-900 text-xl'>Subtasks</h3>
                    <IoMdAddCircle onClick={()=>setShowSubtask(true)} className='text-2xl cursor-pointer text-slate-900'/>
                {showSubtask&&<div className="absolute right-10 bg-white top-0 pb-6 pt-0 px-3 border border-slate-300 rounded-md shadow-md w-[50%] flex flex-col">
                    <button className='text-end text-lg' onClick={()=>setShowSubtask(false)}>x</button>
                    <div className="flex gap-2 items-center">
                    <input type="text" className='border border-slate-300 w-[90%] p-3 rounded-md' placeholder='Enter Title' ref={description}/>
                    <IoMdAdd className='text-5xl w-[10%] cursor-pointer' onClick={addSubtask}/>

                    </div>
                </div>}
                </div>
                <div className="flex flex-col gap-3">
                    <ViewSubtask taskId={userStory?._id} projectId={userStory?.projectId}/>
                </div>
            </div>
            <div className='mt-10'>
                <h3 className='font-bold text-slate-900 text-xl'>Attachments</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-5">
                {userStory?.attachments.map(image=>{
                    return (
                        <a href={BACKEND_IMAGE_URL+image} target="_blank">
                        <img className='w-60 opacity-85 shadow-md bg-gradient-to-b from-slate-600 aspect-auto' src={BACKEND_IMAGE_URL+image} alt="" />
                        </a>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default MainTaskContainer