import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../utils/constants'
import { token } from '../../utils/getToken'
import { Link, useNavigate } from 'react-router-dom'

const Subtask = ({subTask}) => {
    const navigate=useNavigate()
    const [email,setEmail]=useState(null)
    console.log('This is subtask in subtask',subTask)
    const fetchEmails=async()=>{
        let data=await fetch(BACKEND_URL+'/common-tasks/getEmail',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                'assignedTo':subTask?.assignedTo
            })
        })

        data=await data.json()
        if(data?.result?.data.length)
        setEmail(data?.result?.data)
    }
    useEffect(()=>{
        fetchEmails()
    },[])
  return (
     <div className='flex justify-between'>
        {subTask&&<div>
            {email && email.map(e=><div key={e._id}>
            <button className='bg-yellow-500 text-white rounded-full px-3 py-1'>{e.email[0]}</button>
            </div>)}
            

            </div>
        }
        <p className='text-slate-900'>{subTask?.title}</p>
        <p>{subTask.status}</p>
        <p>{subTask.priority}</p>
        <Link className='text-sky-500' to={'/user/view-task/'+subTask._id}>View</Link>
        {/* <a className='text-sky-500' href={'/user/view-task/'+subTask._id}>View</a> */}

    </div>
  )
}

export default Subtask