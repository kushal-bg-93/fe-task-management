import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CheckLogin from './CheckLogin';
import ViewProject from './UserComponents/ViewProject';
import { BACKEND_URL } from '../utils/constants';
import Loader from './Loader';

const MainContainer = () => {
    const navigate=useNavigate()
    const cookies = new Cookies(null, { path: '/'});
    const token=cookies.get('token')
    const [projects,setProjects]=useState(null)
    const [loader,setLoader]=useState(false)

    const getProjects=async()=>{
      setLoader(true)
      let data=await fetch(BACKEND_URL+'/common-projects/view-projects',{
        method:'GET',
        headers:{
          'authorization':token
        }
      })

      data=await data.json();
      setLoader(false)
      setProjects(data?.result?.data)
    }

    useEffect(()=>{
        if(cookies.get('role')==='admin') navigate('/projects')
        
        getProjects()
        
    },[])


  return (
    <div>
      {loader?<Loader/>:""}
        <CheckLogin/>
        {projects&&<ViewProject projectData={projects}/>}
    </div>
  )
}

export default MainContainer