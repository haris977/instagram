import React from 'react'
import {RiUserFollowFill,RiMessage2Fill  } from 'react-icons/ri'
import { CgProfile } from "react-icons/cg";
import {IoHome,IoNotifications } from 'react-icons/io5'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='px-48 py-4 flex justify-between items-center bg-gray-950  text-white'>
      <div className='flex justify-items-end space-x-10'>
      <Link to="/" className='cursor-pointer text-green-600 font-bold'>Logo</Link>
      <div><input type="text" name="search" placeholder='  search here..' className='border-2 text-white rounded-md' /></div>
      </div>
      <div className='flex justify-end space-x-12'>
        <Link to="/" className='cursor-pointer'><IoHome /></Link>
        <Link to="/follow" className='cursor-pointer'><RiUserFollowFill /></Link>
        <Link to="/message" className='cursor-pointer'><RiMessage2Fill /></Link>
        <Link to="/notification" className='cursor-pointer'><IoNotifications /></Link>
        <Link to="/profile" className='cursor-pointer'><CgProfile /></Link>

      </div>
    </div>
  )
}

export default Navbar
