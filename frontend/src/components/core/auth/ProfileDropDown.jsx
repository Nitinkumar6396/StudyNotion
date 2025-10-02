import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from '../../../operations/authApi';

const ProfileDropDown = () => {

  const { user } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [dropdownRef])


  return (
    <div className='text-white max-md:hidden flex relative z-20' ref={dropdownRef}>
      <button onClick={() => setOpen((prev) => !prev)} className='flex flex-row items-center'>
        <img className='w-10 h-10 rounded-full object-center' src={user.image} alt="" />
        <FaCaretDown size={20} />
      </button>

      {
        open && <div className='absolute translate-y-14 -translate-x-10 bg-richblack-800 text-richblack-100 rounded-md border border-richblack-600'>
          <Link to={'/dashboard/my-profile'} onClick={() => setOpen(false)}>
            <div className='flex flex-row items-center gap-1 px-3 py-2 rounded-t-md border-b border-richblack-600 hover:text-richblack-25 hover:bg-richblack-700'>
              <VscDashboard />
              <p>Dashboard</p>
            </div>
          </Link>

          <button onClick={() => {
            dispatch(logout(navigate))
            setOpen(false)
          }} className='w-full'>
            <div className='flex flex-row items-center gap-1 rounded-b-md px-3 py-2 hover:text-richblack-25 hover:bg-richblack-700'>
              <VscSignOut />
              <p>Logout</p>
            </div>
          </button>
        </div>
      }

    </div >
  )
}

export default ProfileDropDown