import React from 'react'

const RightPanelContainer = ({userStory}) => {
  return (
    <div className='flex flex-col gap-5 p-2'>
        <div className="">
        <p className='text-center text-slate-900'>Assigned To</p>
        <div className="flex flex-wrap gap-2 mt-3">
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>

            
        </div>
        </div>
        <hr className='border border-slate-200'/>

        <div className="">
        <p className='text-center text-slate-900'>Assigned By</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
            <button className='bg-yellow-500 rounded-full text-white p-3'>A</button>
            
        </div>
        <hr className='border border-slate-200 mt-4'/>
        <div className="mt-4 flex gap-4 items-center">
            <p className={(userStory?.status=='open')?'bg-green-700 text-white p-1 rounded-md w-fit':(userStory?.status=='on progress')?'bg-yellow-500 text-white p-1 rounded-md w-fit':(userStory?.status=='done')?'bg-slate-400 text-white p-1 rounded-md w-fit':'bg-sky-500 text-white p-1 rounded-md w-fit'}>{userStory?.status}</p>

            <p className={(userStory?.priority=='normal')?'text-green-700':(userStory?.priority=='moderate')?'text-orange-600':'text-red-600'}>{userStory?.priority}</p>
        </div>
        </div>
    </div>
  )
}

export default RightPanelContainer