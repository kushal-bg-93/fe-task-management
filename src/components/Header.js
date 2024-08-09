import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Header = () => {
    const cookies = new Cookies(null, { path: '/'});
  return (
    <>
        <div className="bg-slate-900 shadow-2xl flex justify-between">
            <Link to="/">
            <div className="flex gap-1 items-center">
            <img src="https://dms-prod-storage1.censanext.com/receivable/logo_1723037534.png" alt="logo" className='w-11 m-1'/>
            <h3 className='text-white font-extrabold'>TaskO!</h3>

            </div>
            </Link>

            <ul className='flex justify-between list-none align-middle text-white items-center mx-2 gap-4'>
                {/* <li className='hover:text-slate-200'><Link to="/projects">Projects</Link></li> */}
                <li className='hover:text-slate-200'><Link to={cookies.get('token')?"/logout":"/login"}>{cookies.get('token')?"Logout":"Login"}</Link></li>
            </ul>
        </div>
    </>
  )
}

export default Header