import React, { useEffect, useRef, useState } from 'react'
import { BACKEND_SOCKET_URL, BACKEND_URL } from '../utils/constants'
import TableComponent from './TableComponent'
import socketIOClient from 'socket.io-client'
import Cookies from 'universal-cookie'


const Users = () => {

  const socket = socketIOClient(BACKEND_SOCKET_URL,{ transports : ['websocket'] });

  const cookies = new Cookies(null, { path: '/'});
let token=cookies.get('token')
let userId=cookies.get('userId')


  let projectSearch=useRef(null)
  let password=useRef(null)
  let role=useRef(null)
  let name=useRef(null)
  let email=useRef(null)

  const [users,setUsers]=useState([])
  const [projects,setProjects]=useState(null)
  const [filteredProjects,setFilteredProjects]=useState(null)
  const [filterStatus,setFilterStatus]=useState(false)
  const [selectedFilteredData,setSelectedFilteredData]=useState([])
  const [projectId,setProjectId]=useState([])

  const getUsers=async()=>{
    let data=await fetch(BACKEND_URL+'/admin/get-users',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      }
    })

    data=await data.json()
    setUsers(data?.result?.data)
  }

  const getProject=async()=>{
    let data=await fetch(BACKEND_URL+'/admin/view-project',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      }
    })

    data=await data.json()

    setProjects(data?.result?.data)
  }

  const handleProjectSuggestion=async ()=>{
    if(projects){
      const filterData=projects.filter(project=>{
        return project?.name.toLowerCase().includes(projectSearch.current.value.toLowerCase())
      })

      setFilteredProjects(filterData)
    }
  }

  const handleFilterClick=(filter)=>{
    setFilterStatus(false)
    if(!projectId.some(id=>id==filter?._id)){

      // console.log("This is filter",filter)
      setSelectedFilteredData([...selectedFilteredData,filter])
      setProjectId([...projectId,filter?._id])
    }
    // else{
    //   setSelectedFilteredData([...selectedFilteredData,filter])
    //   setProjectId([filter?._id])
    // }
  }

  const handleSubmit=async()=>{
    let data=await fetch(BACKEND_URL+'/admin/create-user',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      },
      body:JSON.stringify({
        name:name?.current?.value,
        email:email?.current?.value,
        projectId:projectId,
        role:role?.current?.value,
        password:password?.current?.value
      })
    })

    password.current.value=""
    role.current.value=""
    name.current.value=""
    email.current.value=""
    projectSearch.current.value=""
    setSelectedFilteredData([])

    data=await data.json()
  }

  socket.on(`createUser:${userId}`,(user)=>{
    console.log('This is socket response',user)
    setUsers([user,...users])
  })


  useEffect(()=>{
    getUsers()
    getProject()

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  },[])


  return (
    <div className='w-full overflow-x-hidden'>
      <div className="md:flex md:flex-row flex flex-col gap-4 m-5">
        <div className="md:w-[60%] w-full">

      {users.length?<TableComponent headers={['User ID','Name','Role','email']} data={users}/>:""}
        </div>
      <div className="border border-slate-300 rounded-md flex flex-col gap-4 p-4 w-[100%] md:w-[40%] shadow-md">

        <input type="text" name='name' ref={name} autoComplete='off' id='name' placeholder='Enter Name' className='border border-slate-300 rounded-md p-2 w-full' />

        <input type="text" name='email' ref={email} autoComplete='off' id='email' placeholder='Enter Email' className='border border-slate-300 rounded-md p-2 w-full' />

        <div className="relative">
        <input type="text" name='project' autoComplete='off' id='project' placeholder='Enter Project' className='border border-slate-300 rounded-md p-2 w-full' onChange={handleProjectSuggestion} ref={projectSearch} onFocus={()=>setFilterStatus(true)}/>

        {
          filterStatus?<>
          {filteredProjects?<div className="p-4 bg-white absolute z-10 border border-slate-300 w-full">
            {
              filteredProjects.map(filter=><>
              <p key={filter._id} className='hover:bg-gray-300 cursor-pointer p-1' onClick={()=>handleFilterClick(filter)}>{filter.name}</p>
              </>)
            }
          </div>:""}
          </>:""
        }
</div>
<div className="flex gap-3">
  {
    selectedFilteredData.length?selectedFilteredData.map(project=><p key={project?._id} className='p-2 border border-slate-300 rounded-md'>
      {project?.name}
    </p>):""
  }
</div>
<select name="role" id="role" className='p-2 rounded-md border border-slate-300' ref={role}>
  <option value="developer">Developer</option>
  <option value="qa">QA</option>
</select>
<input type="password" ref={password} placeholder='*************' className='border border-slate-300 rounded-md p-2 w-full' />
<button className='p-2 bg-slate-900 text-white rounded-md' onClick={handleSubmit}>Create User</button>
      </div>
      </div>
    </div>
  )
}

export default Users