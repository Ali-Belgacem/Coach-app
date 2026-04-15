import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken, onMenuClick}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='flex items-center gap-3'>
          <button
            aria-label='Open menu'
            onClick={onMenuClick}
            className='md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        </div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
      
    </div>
  )
}

export default Navbar
