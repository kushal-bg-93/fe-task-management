import React, { useEffect, useState } from 'react'
import { BACKEND_SOCKET_URL, BACKEND_URL } from '../../utils/constants'
import Subtask from './Subtask'
import { useParams } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


const ViewSubtask = ({taskId}) => {
  const cookies = new Cookies(null, { path: '/'});
let token=cookies.get('token')
let userId=cookies.get('userId')
  const [subTasks,setSubTasks]=useState(null)
  const socket = socketIOClient(BACKEND_SOCKET_URL,{ transports : ['websocket'] });
  const navigate=useNavigate()

  const fetchSubtasks=async()=>{
    let data = await fetch(BACKEND_URL+'/common-subtask/view-subtasks',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      },
      body:JSON.stringify({
        taskId:taskId
      })
    })

    data=await data.json()
    setSubTasks(data?.result?.data)
  }
  useEffect(()=>{
    fetchSubtasks()

    
  },[taskId])

  useEffect(()=>{
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  },[])

  socket.on(`newSubtask:${taskId}`, (subTask) => {
    console.log('This is subtask from socket',subTask)
    if(subTasks)
    {
      setSubTasks([subTask,...subTasks])

    }else{
      setSubTasks([subTask])
    }
    // setTaskStatus(status)
  });


  return subTasks?(
    <div key={subTasks?._id}>
      {
        subTasks && subTasks.map(subTask=><div className='p-2 rounded-md border border-slate-400 align-middle mt-3' key={subTask._id}>
          <Subtask key={subTask?._id} subTask={subTask}/>
        
        </div>)
      }
    </div>
  ):""
}

export default ViewSubtask