import React from 'react'
import Header from './Header'
// import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Cookies from 'universal-cookie';

const Body = () => {
    const cookies = new Cookies(null, { path: '/'});
  return (
    <div>
        <Header/>
        <div className="flex gap-1">
        {(cookies.get('role')==='admin')&&<Sidebar/>}
        <Outlet/>
        </div>
    </div>
  )
}

export default Body