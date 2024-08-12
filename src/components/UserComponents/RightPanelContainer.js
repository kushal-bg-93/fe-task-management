import React, { useEffect, useRef, useState } from 'react'
import { BACKEND_SOCKET_URL, BACKEND_URL } from '../../utils/constants'
import { token,userId } from '../../utils/getToken'
import socketIOClient from 'socket.io-client'

const RightPanelContainer = ({ userStory }) => {
  // console.log("this is user story in right pannel", userStory)
  // const {assignedTo}=userStory
  const socket = socketIOClient(BACKEND_SOCKET_URL,{ transports : ['websocket'] });
  const [emails, setEmails] = useState(null)
  const [assignedByEmail,setAssignedByEmail]=useState(null)
  const [taskStatus,setTaskStatus]=useState(userStory.status)
  const [statusPopup,setStatusPopup]=useState(false)
  const statusRef=useRef(null)


  const getEmails = async() => {

    let data = await fetch(BACKEND_URL + '/common-tasks/getEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body:JSON.stringify({
        assignedTo:userStory?.assignedTo
      })
    })  

    let ownerEmail=await await fetch(BACKEND_URL + '/common-tasks/getEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body:JSON.stringify({
        createdBy:userStory?.createdBy
      })
    })

    data = await data.json()
    ownerEmail=await ownerEmail.json()
    setAssignedByEmail(ownerEmail?.result?.data)
    setEmails(data?.result?.data)
  }

  socket.on(`changeStatus:${userStory?._id}`, (status) => {
    setTaskStatus(status)
  });

  const handleStatusChange=async ()=>{
    const changeStatus=await fetch(BACKEND_URL+'/common-tasks/updateStatus',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      },
      body:JSON.stringify({
        status:statusRef?.current?.value,
        taskId:userStory?._id
      })
    })
    setStatusPopup(false)

  }
  useEffect(() => {
      getEmails()
  }, [assignedByEmail])
  return (
    <div className='flex flex-col gap-5 p-2'>
      <div className="">

        {
          emails && <>
            <p className='text-center text-slate-900'>Assigned To</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {
                emails.map((email,index)=>(<div key={index}>
                <button className='bg-yellow-500 rounded-full text-white px-4 py-2'>{email.email[0]}</button>
                </div>))
              }
              
            </div>
            <hr className='border mt-3 border-slate-200' />
          </>
        }

      </div>

      <div className="">
        <>
        {
          assignedByEmail && (<>
            <p className='text-center text-slate-900'>Assigned By</p>
            <div className="flex flex-wrap justify-start gap-2 mt-3 items-center">
              {assignedByEmail.map((email,index)=>(
                <div key={email._id}>
          <button className='bg-yellow-500 rounded-full text-white px-4 py-2' key={email._id}>{email.email[0]}</button>
          <span className='text-sm font-thin text-slate-500 ml-4'>{email.email}</span>

                </div>
              ))}

        </div>
        </>
          )
        }
        
        </>
        
        <hr className='border border-slate-200 mt-4' />
        <div className="mt-4 flex gap-4 items-center">
          <p className={(taskStatus == 'open') ? 'bg-green-700 text-white p-1 rounded-md w-fit' : (taskStatus == 'on progress') ? 'bg-yellow-500 text-white p-1 rounded-md text-[12px]' : (taskStatus == 'done') ? 'bg-slate-400 text-white p-1 rounded-md w-fit' : 'bg-sky-500 text-white p-1 rounded-md w-fit'}>{taskStatus}</p>
          <div className="relative">
        {userStory?.assignedTo?
          (userStory?.assignedTo.some(uid=>uid==userId))&&
          <button className='text-sky-500' onClick={()=>setStatusPopup(true)}>Change Status</button>
        :""}
        {
          statusPopup&&<div className='absolute left-0 top-0 z-10 bg-white pb-2 px-2 shadow-md pt-0 border border-slate-400 rounded-md flex flex-col'>
            <button className='text-end p-0' onClick={()=>setStatusPopup(false)}>x</button>
            <select name="status" id="" ref={statusRef} onChange={handleStatusChange}>
              <option value="on progress">On Progress</option>
              <option value="done">Done</option>
              <option value=" " selected='selected' disabled>Select Status </option>

            </select>
          </div>
        }
        </div>
          <p className={(userStory?.priority == 'normal') ? 'text-green-700' : (userStory?.priority == 'moderate') ? 'text-orange-600' : 'text-red-600'}>{userStory?.priority}</p>
        </div>
      </div>
    </div>
  )
}

export default RightPanelContainer