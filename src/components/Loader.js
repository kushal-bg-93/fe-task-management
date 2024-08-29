import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex items-center justify-center w-full h-full absolute z-20'><InfinitySpin
            visible={true}
            width="200"
            color="#ff5d53"
            ariaLabel="infinity-spin-loading"
            /></div>
  )
}

export default Loader