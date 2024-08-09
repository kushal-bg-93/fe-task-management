import React from 'react'
import moment from 'moment'
import { BsCalendarDate } from "react-icons/bs";
import { BACKEND_IMAGE_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';


const MainTaskContainer = ({userStory}) => {
    console.log('This is user story',userStory)
  return (
    <div className='w-[80%] border-b-0 border-r border-slate-200 shadow-lg p-4'>
        <div className="flex flex-col">
            <div className="flex justify-between mt-10">
                <h1 className='text-4xl font-extrabold text-slate-900'>{userStory?.title}</h1>
                <div className='flex gap-2 text-center align-middle items-center'>
                <BsCalendarDate className='text-slate-900'/>
                <p className='text-slate-400 font-bold'>
                    {moment(userStory?.deadline).format('YYYY-MM-DD')}
                </p>
                </div>
            </div>
            <div className="mt-10 text-justify">
                <p className='text-slate-900 font-thin'>{userStory?.description}</p>
            </div>
            <div className='mt-10'>
                <h3 className='font-bold text-slate-900 text-xl'>Attachments</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-5">
                {userStory?.attachments.map(image=>{
                    return (
                        <a href={BACKEND_IMAGE_URL+image} target="_blank">
                        <img className='w-60 opacity-85 shadow-md bg-gradient-to-b from-slate-600 aspect-auto' src={BACKEND_IMAGE_URL+image} alt="" />
                        </a>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default MainTaskContainer