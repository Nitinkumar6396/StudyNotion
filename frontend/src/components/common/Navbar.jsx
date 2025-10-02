import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/auth/ProfileDropDown'
import MobProfileDropDown from '../core/auth/MobProfileDropDown'
import { FaAngleDown } from "react-icons/fa6";
import { BsFillCaretUpFill } from "react-icons/bs";
import { fetchAllCategories } from '../../operations/catalogApi'
import { setCategories } from '../../slices/categorySlice'

const Navbar = () => {

  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.profile)
  const { totalItems } = useSelector(state => state.cart)
  const { categories } = useSelector(state => state.category)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSublinks = async () => {
      setLoading(true)
      const result = await fetchAllCategories()
      dispatch(setCategories(result))
      setLoading(false)
    }
    fetchSublinks()
  }, [])

  const location = useLocation()

  return (
    <div className='h-14 border-b border-richblack-700 flex justify-center'>
      <div className='w-11/12 flex flex-row justify-between items-center max-w-maxContent'>
        <Link to={'/'} className='w-40'>
          <img src={logo} alt="logo" />
        </Link>

        <nav className='max-md:hidden'>
          <ul className='flex gap-x-6 text-richblack-25 items-center'>
            {
              NavbarLinks.map((item, index) => {
                return (
                  <li key={index}>
                    {
                      item.title === "Catalog"
                        ? (
                          <div className='group cursor-pointer h-14 flex'>
                            <div className={`flex flex-row items-center gap-2 ${location.pathname.startsWith('/catalog') ? 'text-yellow-50' : 'text-richblack-25'}`}>
                              {item.title}
                              <FaAngleDown />
                            </div>
                            <BsFillCaretUpFill className='absolute text-5xl translate-y-6 translate-x-12 text-richblack-5 invisible group-hover:visible transition-all duration-200' />
                            <div className='absolute flex flex-col bg-richblack-5 p-3 rounded-md translate-y-14 -translate-x-6 invisible group-hover:visible transition-all duration-200 z-20'>
                              {
                                loading
                                  ? (
                                    <p className='px-2 py-1 rounded-md w-44 text-richblack-900'>Loading...</p>
                                  )
                                  : categories.length > 0
                                    ? (
                                      categories.map((sublink, index) => {
                                        return (
                                          <Link key={index} to={`/catalog/${sublink.name}`} className='hover:bg-richblack-50 p-2 rounded-md w-44 text-richblack-900' >
                                            {sublink.name}
                                          </Link>
                                        )
                                      })
                                    )
                                    : <p className='text-richblack-900'>No Courses Found</p>
                              }
                            </div>
                          </div>
                        )
                        : (
                          <Link to={item.path} className={`${location.pathname === item.path ? "text-yellow-50" : "text-richblack-25"}`}>
                            {item.title}
                          </Link>
                        )
                    }
                  </li>
                )
              })
            }
          </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>
          {
            user && user.accountType === 'Student' && (
              <Link to={'/dashboard/cart'} className='text-white text-2xl relative max-md:hidden'>
                {totalItems > 0
                  ? <p className='absolute text-sm w-4 h-4 flex justify-center items-center rounded-md bg-yellow-50 text-richblack-900 font-semibold bottom-[0.9rem] left-[0.7rem]'>{totalItems}
                  </p>
                  : ''
                }
                <IoCartOutline size={28} />
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }

          <MobProfileDropDown />

          {
            token === null && (
              <Link to={'/login'} className='max-md:hidden'>
                <button className={` px-[12px] py-[6px] text-richblack-25 rounded-md ${location.pathname === '/login' ? 'border-[1.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}>
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={'/signup'} className='max-md:hidden'>
                <button className={` px-[12px] py-[6px] text-richblack-25 rounded-md ${location.pathname === '/signup' ? 'border-[1.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} `}>
                  Sign Up
                </button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar