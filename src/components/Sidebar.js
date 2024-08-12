import React from 'react'
import { GrProjects } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaTasks,FaRegUser } from "react-icons/fa";



const Sidebar = () => {
  return (
    <div className='min-h-screen'>
        <div className="bg-slate-800 h-[100%] md:h-[100%] md:w-40 p-3">
            <ul className='list-none text-center items-center'>

                <li className='ml-0 text-white text-base my-3'><Link className='flex text-center items-center gap-4' to="/projects"><GrProjects className='text-white'/><span className='hidden md:block'>PROJECT</span></Link></li>

                <li className='ml-0 text-white text-base my-3'><Link className='flex text-center items-center gap-4' to="/tasks"><FaTasks className='text-white'/><span className='hidden md:block'>TASKS</span></Link></li>

                <li className='ml-0 text-white text-base my-3'><Link className='flex text-center items-center gap-4' to="/users"><FaRegUser className='text-white'/><span className='hidden md:block'>USER</span></Link></li>
                

            </ul>
        </div>
    </div>
  )
}

export default Sidebar