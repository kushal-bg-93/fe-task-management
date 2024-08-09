import React from 'react'
import { Link } from 'react-router-dom'

const ViewProject = ({projectData}) => {
  return (
    <div className='flex gap-40 m-10'>
        {projectData.map(project=>(<Link to={'/user/view-tasks'+`/${project?._id}`} key={project?._id}>
            <div className="border border-slate-400 rounded-md shadow-lg p-3 m-0 cursor-pointer hover:scale-105 ease-in-out delay-75" key={project?._id}>
                <h3 className='text-slate-900 text-2xl'>{project?.name}</h3>
                <hr className='text-slate-900 my-2'/>
                <h5 className='text-slate-500'>{project?._id}</h5>
            </div>
        </Link>))}
    </div>
  )
}

export default ViewProject