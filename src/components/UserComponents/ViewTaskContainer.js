import React, { useEffect, useState } from 'react'
import MainTaskContainer from './MainTaskContainer'
import RightPanelContainer from './RightPanelContainer'
import CommentContainer from './CommentContainer'
import { BACKEND_URL } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import CheckLogin from '../CheckLogin'

const ViewTaskContainer = () => {
    const [userStory,setUserStory]=useState(null)
    const cookies = new Cookies(null, { path: '/'});
    let token=cookies.get('token')

    const taskId=useParams()
    
    const setStoryData=async()=>{
        let data=await fetch(BACKEND_URL+'/common-subtask/view-subtask?taskId='+taskId?.id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
        })

        data=await data.json()
        setUserStory(data?.result?.data)
    }

    useEffect(()=>{
        setStoryData()
    },[taskId])
  return (
    
    <div>
{userStory&&
     <>   <CheckLogin/>
        <div className="flex flex-col w-screen">
        <div className="flex">
            <MainTaskContainer userStory={userStory}/>

            <RightPanelContainer key={userStory?._id} userStory={userStory}/>
        </div>
        <div className="w-full border border-slate-200">
            <CommentContainer key={userStory?._id} taskId={taskId.id}/>
        </div>
        </div>
        </>
        }
    </div>
  )
}

export default ViewTaskContainer