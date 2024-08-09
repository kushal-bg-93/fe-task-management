import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../../utils/constants'
import Cookies from 'universal-cookie';
import CheckLogin from '../CheckLogin';

const ViewTasks = () => {
    const cookies = new Cookies(null, { path: '/'});
    const token=cookies.get('token')

    const projectId=useParams()
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
    const [taskData,setTaskData]=useState(null)

    const getTasks=async()=>{
        let data=await fetch(BACKEND_URL+'/common-tasks/view-tasks',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                pgNo:currentPage,
                filterData:{
                    projectId:projectId.id
                }
            })
        })

        data=await data?.json();
        if(data?.result?.data?.result) 
            {
                const {total,pageSize}=data?.result?.data?.pageData
                setTaskData(data?.result?.data?.result)
                setTotalPage(Math.ceil(total/pageSize))
            }

    }
    useEffect(()=>{
        getTasks()
    },[currentPage])


  return (
    <div>
        <CheckLogin/>
        <div className="m-10">
        {taskData&&<div className="flex gap-2 overflow-x-auto mx-2 my-4">
        <table className='min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-slate-900'>
              <tr>
                <th className='py-2 px-4'>Id</th>
                <th className='py-2 px-4'>Tasks</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Priority</th>
                <th className='py-2 px-4'>Show</th>

              </tr>
            </thead>
          <tbody className='text-slate-900'>
            {
              taskData && taskData.map((item) => {
                let color=(item?.priority=='normal')?'bg-green-700 text-white':(item?.priority=='moderate')?'bg-orange-500 text-white':'bg-red-700 text-white'
                console.log('this iscolor>>',color)
                return(
                <tr key={item._id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                  <td className="py-2 px-4">{item._id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className={`py-2 px-4 ${color}`}>{item.priority}</td>
                  <td className="py-2 px-4"><Link to={'/user/view-task/'+item._id} className='text-sky-600 hover:underline'>View</Link></td>
                </tr>
              )})
              
            }
          </tbody>
        </table>
      </div>}

      </div>

      <div className='flex gap-10 mt-4 justify-center'>
        {(currentPage>1) && <button onClick={()=>setCurrentPage(currentPage-1)} className='text-slate-900 text-4xl'>{"<"}</button>}
        {(currentPage<totalPage) && <button onClick={()=>setCurrentPage(currentPage+1)} className='text-slate-900 text-4xl'>{">"}</button>}
      </div>
    </div>
  )
}

export default ViewTasks