import React, { useEffect, useState } from 'react'
import {BACKEND_URL} from "../utils/constants"
import Cookies from 'universal-cookie';
import CheckLogin from './CheckLogin';
import CreateTaskPopup from './Create-Task-Popup';
import Loader from './Loader';

const Tasks = () => {
  const [tasks,setTasks]=useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage]=useState(1)
  const [showModal,setShowModal]=useState(false)
  const [loader,setLoader]=useState(false)

  const cookies = new Cookies(null, { path: '/'});
  let token=cookies.get('token')
  let userId=cookies.get('userId')

  const fetchTasks=async()=>{
    setLoader(true)
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
    setLoader(false)
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
      {loader?<Loader/>:""}
      {showModal && <CreateTaskPopup setModal={setShowModal}/>}
      <div className="flex my-4 mx-2">
        <button className='bg-slate-900 text-white md:text-base md:p-4 p-1 text-[6px] rounded-md ' onClick={()=>setShowModal(true)}>CREATE TASK</button>
      </div>
      {tasks&&<div className="flex gap-2 overflow-x-auto md:mx-2 mx-0 my-4">
        <table className='min-w-full  bg-white border-gray-200 shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-slate-900'>
              <tr>
                <th className='md:py-2 py:1 md:px-4 px-1 md:text-base text-[10px]'>Id</th>
                <th className='md:py-2 py:1 md:px-4 px-1 md:text-base text-[10px]'>Title</th>
                <th className='md:py-2 py:1 md:px-4 px-1 md:text-base text-[10px]'>Status</th>
                <th className='md:py-2 py:1 md:px-4 px-1 md:text-base text-[10px]'>Priority</th>
              </tr>
            </thead>
          <tbody className='text-slate-900'>
            {
              tasks && tasks.map((item) => {
                let color=(item?.priority=='normal')?'bg-green-700 text-white':(item?.priority=='moderate')?'bg-orange-500 text-white':'bg-red-700 text-white'
                // console.log('this iscolor>>',color)
                return(
                <tr key={item._id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                  <td className="md:py-2 md:px-4 py-1 px-1 text-[7px] md:text-base">{item._id}</td>
                  <td className="md:py-2 md:px-4 py-1 px-1 text-[7px] md:text-base">{item.title}</td>
                  <td className="md:py-2 md:px-4 py-1 px-1 text-[7px] md:text-base">{item.status}</td>
                  <td className={`md:py-2 md:px-4 py-1 px-1 text-[7px] md:text-base ${color}`}>{item.priority}</td>
                </tr>
              )})
              
            }
          </tbody>
        </table>
      </div>}

      <div className='flex gap-10 mt-4 justify-center'>
        {(currentPage>1) && <button onClick={()=>setCurrentPage(currentPage-1)} className='text-slate-900 text-lg md:text-4xl'>{"<"}</button>}
        {(currentPage<totalPage) && <button onClick={()=>setCurrentPage(currentPage+1)} className='text-slate-900 text-lg md:text-4xl'>{">"}</button>}
      </div>

    </div>
  )
}

export default Tasks