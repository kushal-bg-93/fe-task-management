import React, { useEffect, useRef, useState } from 'react'
import { BACKEND_SOCKET_URL, BACKEND_URL } from '../../utils/constants'
import socketIOClient from 'socket.io-client'
import Cookies from 'universal-cookie'
import { TiUserAdd } from "react-icons/ti";
import store from '../../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoSuggestions,removeAutoSuggestion } from '../../utils/userAutoSuggestionSlice';

const RightPanelContainer = ({ userStory }) => {
  const cookies = new Cookies(null, { path: '/'});
let token=cookies.get('token')
let userId=cookies.get('userId')
  // console.log("this is user story in right pannel", userStory)
  // const {assignedTo}=userStory
  const socket = socketIOClient(BACKEND_SOCKET_URL,{ transports : ['websocket'] });
  const [emails, setEmails] = useState(null)
  const [assignedByEmail,setAssignedByEmail]=useState(null)
  const [taskStatus,setTaskStatus]=useState(userStory.status)
  const [statusPopup,setStatusPopup]=useState(false)
  const [forceUpdate, setForceUpdate] = useState(false);
  const [userSearchPopup,setUserSearchPopup]=useState(false)
  
  const [searchText,setSearchText]=useState(null)
  const autoSuggestionResults=useSelector(store=>store?.autoSuggestionUser?.result)
  const [searchResults,setSearchResults]=useState(null)
  const [searchResultStatus,setSearchResultStatus]=useState(false)
  const [assignedTo,setAssignedTo]=useState(userStory?.assignedTo)
  const [searchSelectList,setSearchSelectList]=useState([])
  const statusRef=useRef(null)
  const dispatch=useDispatch()

  useEffect(()=>{
    let timer=setTimeout(()=>{getAutoSuggestion()},300)
    
    return ()=>clearTimeout(timer)
},[searchText,searchResults])


  async function getAutoSuggestion(){

    if(searchText){
        if(!autoSuggestionResults[searchText]){
            let searchRes={}
            
            // console.log('url>>',searchText)
            
            let data=await fetch(BACKEND_URL+'/common-user/searchUser?search='+searchText+'&projectId='+userStory?.projectId,{
              method:'GET',
              headers:{
                'Content-Type':'application/json',
                'authorization':token
              },
            })
            data=await data.json();
            

            data.result.data=data?.result?.data.filter(user=>{
              return !assignedTo.some(userId=>userId==user?._id)
            })


            searchRes[searchText]=data?.result?.data

            dispatch(setAutoSuggestions(searchRes))
            // console.log('This is autosuggestion>>>',data)
        }
        setSearchResults(autoSuggestionResults[searchText])

    }
}

const searchSuggestionClickHandle=async(user)=>{
  let data=await fetch(BACKEND_URL+'/common-tasks/assign-task',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'authorization':token
    },
    body:JSON.stringify({
      taskId:userStory?._id,
      userId:user?._id
    })
  })

  data=await data.json()
  setUserSearchPopup(false)
  dispatch(removeAutoSuggestion())
  setSearchResults(null)
  setSearchText(null)
}

  const getOwnerEmail=async()=>{
    let ownerEmail=await fetch(BACKEND_URL + '/common-tasks/getEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body:JSON.stringify({
        createdBy:userStory?.createdBy
      })
    })

    ownerEmail=await ownerEmail.json()
    setAssignedByEmail(ownerEmail?.result?.data)
  }


  const getEmails = async() => {

    let data = await fetch(BACKEND_URL + '/common-tasks/getEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body:JSON.stringify({
        assignedTo:assignedTo
      })
    })  

   

    data = await data.json()
    
    setEmails(data?.result?.data)
  }

  socket.on(`newAssignedToUser:${userStory?._id}`,(user)=>{
    // console.log('This is the user from socket >>>',user)
    setAssignedTo(user?.assignedTo)
  })

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
      getOwnerEmail()

      
  }, [assignedTo])

  useEffect(()=>{
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  },[])


  return (userStory)?(
    <div className='flex flex-col gap-5 p-2'>
      <div className="">

        {
          emails && <>
          <div className="flex gap-3 relative justify-center items-center">
            
                <p className='text-center text-slate-900'>Assigned To</p>
                <TiUserAdd className='text-end grid-cols-1 text-slate-900 text-lg cursor-pointer' onClick={()=>setUserSearchPopup(true)}/>

                {
                userSearchPopup && 
                <div className="absolute rounded shadow-md border border-slate-300 px-2 pb-3 w-[100%] bg-white z-10 left-[-50%] top-[20%] flex flex-col">
                  <button className="text-end" onClick={()=>setUserSearchPopup(false)}>x</button>
                  <div className="relative">
                  <input type="text" className='p-2 w-full border border-slate-300 rounded-md' placeholder='Search User' value={searchText} onChange={(e)=>setSearchText(e.target.value)} onFocus={()=>setSearchResultStatus(true)} onBlur={()=>setTimeout(()=>setSearchResultStatus(false),200)}/>

                  {(searchResultStatus && searchResults)?<div className="absolute bottom-0 top-[90%] w-[99%] z-30 border h-fit border-slate-300 bg-white px-2 pt-2 ">
          {
            searchResults && <>
                {
                  searchResults.map((element)=><>
                  <div className="flex mb-5 gap-3 hover:bg-gray-50 items-center cursor-pointer"  onClick={()=>searchSuggestionClickHandle(element)} key={element?._id}>
                  <button className='bg-yellow-500 rounded-full text-white px-3 py-1'>{element?.email[0]}</button>
                  <p className='cursor-pointer text-slate-900  rounded-md'>{element.name}</p>
                  </div>
                  </>)
                }
            </>
          }

        </div>:""}

                  </div>
                </div>}
          </div>

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
  ):""
}

export default RightPanelContainer