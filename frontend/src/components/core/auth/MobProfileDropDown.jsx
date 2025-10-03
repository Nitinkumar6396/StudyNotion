import { useState, useEffect } from "react"
import { IoMenu } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { logout } from "../../../operations/authApi"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { RxCross2 } from "react-icons/rx"
import { NavbarLinks } from '../../../../data/navbar-links'
import { fetchAllCategories } from '../../../operations/catalogApi'
import { setCategories } from '../../../slices/categorySlice'
import { FaAngleDown } from "react-icons/fa6"

const MobProfileDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const { token } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.profile)
  const { categories } = useSelector(state => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSublinks = async () => {
      setLoading(true)
      const result = await fetchAllCategories()
      dispatch(setCategories(result))
      setLoading(false)
    }
    fetchSublinks()
  }, [dispatch])

  // console.log(location)

  return (
    <div className='md:hidden text-richblack-5 relative'>
      {/* Hamburger / Close Icon */}
      {!showDropDown ? (
        <IoMenu size={28} className="cursor-pointer" onClick={() => setShowDropDown(true)} />
      ) : (
        <RxCross2 size={28} strokeWidth={0.8} className="cursor-pointer" onClick={() => setShowDropDown(false)} />
      )}

      {showDropDown && (
        <div
          className="fixed inset-0 bg-richblack-900 bg-opacity-50 z-40"
          onClick={() => setShowDropDown(false)}
        ></div>
      )}

      {/* Dropdown Menu */}
      {(
        <div className={`absolute top-12 right-2 w-60 z-50 bg-richblack-600 p-4 rounded-md transition-all duration-300 ${showDropDown ? "" : "translate-x-[120%]"}`}
        >

          {/* Login / Signup (for guests) */}
          {!token && (
            <div className="flex flex-col gap-1">
              <Link to={'/login'}>
                <button onClick={() => setShowDropDown(false)} className={`px-3 py-1 rounded-md w-full ${location.pathname === '/login' ? 'border-[1.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} text-richblack-25`}>
                  Log in
                </button>
              </Link>
              <Link to={'/signup'}>
                <button onClick={() => setShowDropDown(false)} className={`px-3 py-1 rounded-md w-full ${location.pathname === '/signup' ? 'border-[1.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'} text-richblack-25`}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Dashboard / Logout (for logged in users) */}
          {token && (
            <div className="flex flex-col gap-1">
              <Link onClick={() => setShowDropDown(false)} to={'/dashboard/my-profile'}>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${location.pathname == '/dashboard/my-profile' ? 'bg-yellow-50 text-richblack-900' : 'hover:bg-richblack-700'}`}>
                  <VscDashboard /> <p>Dashboard</p>
                </div>
              </Link>

              {user?.accountType === 'Student' && (
                <Link onClick={() => setShowDropDown(false)} to={'/dashboard/cart'}>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${location.pathname == '/dashboard/cart' ? 'bg-yellow-50 text-richblack-900' : 'hover:bg-richblack-700'}`}>
                    🛒 <p>Cart</p>
                  </div>
                </Link>
              )}

              <button onClick={() => {
                dispatch(logout(navigate))
                setShowDropDown(false)
              }} className='w-full'>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md hover:bg-richblack-700`}>
                  <VscSignOut /> <p>Logout</p>
                </div>
              </button>
            </div>
          )}

          <hr className="border-richblack-200 my-2" />

          {/* Navbar Links */}
          <div className="flex flex-col gap-1 text-center">
            {NavbarLinks.map((link, idx) => (
              <div key={idx}>
                {link.title === "Catalog" ? (
                  <div>
                    <button
                      className="flex flex-row gap-2 w-fit mx-auto justify-between items-center py-1 rounded-md hover:bg-richblack-600"
                      onClick={() => setCatalogOpen(!catalogOpen)}
                    >
                      {link.title} <FaAngleDown />
                    </button>
                    {catalogOpen && (
                      <div className="flex flex-col rounded-md mt-1 gap-1 bg-richblack-700">
                        {loading ? (
                          <p className="text-richblack-900 px-2 py-1">Loading...</p>
                        ) : categories.length > 0 ? (
                          categories.map((cat, cidx) => (
                            <Link onClick={() => setShowDropDown(false)} key={cidx} to={`/catalog/${cat.name}`}>
                              <p className="px-3 py-1 rounded-md text-end hover:bg-richblack-800 ">{cat.name}</p>
                            </Link>
                          ))
                        ) : (
                          <p className="px-2 py-1 text-richblack-900">No Courses Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link onClick={() => setShowDropDown(false)} to={link.path}>
                    <p className={`py-1 rounded-md ${location.pathname === link.path ? 'bg-yellow-50 text-richblack-900' : 'hover:bg-richblack-700'}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MobProfileDropDown
