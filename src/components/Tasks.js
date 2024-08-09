import React, { useEffect, useState } from 'react'
import {BACKEND_URL} from "../utils/constants"
import Cookies from 'universal-cookie';
import CheckLogin from './CheckLogin';
import CreateTaskPopup from './Create-Task-Popup';

const Tasks = () => {
  const [tasks,setTasks]=useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage]=useState(1)
  const [showModal,setShowModal]=useState(false)

  const cookies = new Cookies(null, { path: '/'});
  let token=cookies.get('token')
  let userId=cookies.get('userId')

  const fetchTasks=async()=>{
    let data=await fetch(BACKEND_URL+`/admin/view-tasks?pageNo=${currentPage}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'authorization':token
      },
      // body:JSON.stringify({
      //   'pgNo':currentPage,
      //   'filterData':{
      //     userId:userId
      //   }
      // })
    })
    data=await data.json()
    setTasks(data?.result?.data?.result)
    let {total,pageSize}=data?.result?.data?.pageData
    setTotalPage(Math.ceil(total/pageSize))
  }

  useEffect(()=>{
    fetchTasks();
  },[currentPage])

  return (
    <div>
      <CheckLogin/>
      {showModal && <CreateTaskPopup setModal={setShowModal}/>}
      <div className="flex my-4 mx-2">
        <button className='bg-slate-900 text-white p-4 rounded-md ' onClick={()=>setShowModal(true)}>CREATE TASK</button>
      </div>
      {tasks&&<div className="flex gap-2 overflow-x-auto mx-2 my-4">
        <table className='min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-slate-900'>
              <tr>
                <th className='py-2 px-4'>Id</th>
                <th className='py-2 px-4'>Title</th>
                <th className='py-2 px-4'>Status</th>
                <th className='py-2 px-4'>Priority</th>
              </tr>
            </thead>
          <tbody className='text-slate-900'>
            {
              tasks && tasks.map((item) => {
                let color=(item?.priority=='normal')?'bg-green-700 text-white':(item?.priority=='moderate')?'bg-orange-500 text-white':'bg-red-700 text-white'
                console.log('this iscolor>>',color)
                return(
                <tr key={item._id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                  <td className="py-2 px-4">{item._id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className={`py-2 px-4 ${color}`}>{item.priority}</td>
                </tr>
              )})
              
            }
          </tbody>
        </table>
      </div>}

      <div className='flex gap-10 mt-4 justify-center'>
        {(currentPage>1) && <button onClick={()=>setCurrentPage(currentPage-1)} className='text-slate-900 text-4xl'>{"<"}</button>}
        {(currentPage<totalPage) && <button onClick={()=>setCurrentPage(currentPage+1)} className='text-slate-900 text-4xl'>{">"}</button>}
      </div>

    </div>
  )
}

export default Tasks