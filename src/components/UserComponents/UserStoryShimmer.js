import React from 'react'

const UserStoryShimmer = () => {
  return (
    <div className='flex w-full h-full'>

        <div className="border border-slate-300 flex flex-col rounded-md p-4 w-[80%] h-[100%]" id='MainShimmer'>
            <div className="flex justify-between">
            <div className='bg-gray-200 mt-[3%] p-4 rounded-md w-[20%]'></div>
            <div className='bg-gray-200 mt-[3%] p-4 rounded-md w-[20%]'></div>
            </div>
            <div className="bg-gray-200 p-[10%] mt-[3%] rounded-md w-full">
            </div>

            <div className="flex justify-between">

            <div className='bg-gray-200 mt-[3%] p-4 rounded-md w-[20%]'></div>
            <div className='bg-gray-200 mt-[3%] px-4 py-2 rounded-full '></div>
            </div>

            <div className="flex flex-col gap-3 mt-[3%]">
            <div className="bg-gray-200 p-[2%] rounded-md w-full">
            </div>
            <div className="bg-gray-200 p-[2%] rounded-md w-full"></div>
            <div className="bg-gray-200 p-[2%] rounded-md w-full"></div>
            <div className="bg-gray-200 p-[2%] rounded-md w-full"></div>

        </div>
    </div>
    <div className="w-[20%] p-4 flex flex-col" id="rightPanel">
        <div className="flex flex-col" id="assignedTo">
            <div className="bg-gray-200 p-3 rounded-md mt-[15%]"></div>
            <div className="flex gap-4 mt-[6%]">
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            </div>

            <div className="bg-gray-200 p-3 rounded-md mt-[25%]"></div>
            <div className="flex gap-4 mt-[6%]">
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            </div>

            <div className="bg-gray-200 p-3 rounded-md mt-[25%]"></div>
            <div className="flex gap-4 mt-[6%]">
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            </div>

            <div className="bg-gray-200 p-3 rounded-md mt-[25%]"></div>
            <div className="flex gap-4 mt-[6%]">
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            <div className='bg-gray-200 px-5 py-5 rounded-full '></div>
            </div>



        </div>
    </div>
    </div>
  )
}

export default UserStoryShimmer