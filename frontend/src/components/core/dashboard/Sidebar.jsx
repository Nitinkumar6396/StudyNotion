import React, { useState } from 'react'
import DashLink from './DashLink'
import { sidebarLinks } from '../../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { VscSettingsGear } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';
import { logout } from '../../../operations/authApi';

const Sidebar = () => {

    const location = useLocation()
    const { user } = useSelector(state => state.profile)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='flex flex-col border-r border-richblack-500 bg-richblack-800 h-[90vh] overflow-y-auto overflow-x-hidden'>
            <div className='w-60 flex flex-col pt-8 pb-6'>
                {
                    sidebarLinks.map((item, index) => {
                        if (!item.type) {
                            return <DashLink data={item} key={index} />
                        }
                        return item?.type === user?.accountType && <DashLink data={item} key={index} />
                    })
                }
            </div>

            <div className='w-52 mx-auto h-[1.5px] bg-richblack-500'></div>

            <div className='flex flex-col py-6'>
                <Link
                    to={'/dashboard/settings'}
                    className={`flex flex-row items-center px-8 py-2 gap-3 ${location.pathname === '/dashboard/settings' ? "bg-richblack-900 border-l-2 border-yellow-50 text-yellow-50" : ""}`}>
                    <VscSettingsGear />
                    <p>Settings</p>
                </Link>

                <button
                    onClick={() => setConfirmationModal({
                        text1: 'Are You Sure ?',
                        text2: 'You will be logged out of your Account',
                        btn1: {
                            text:
                                <div className='flex flex-row gap-2 items-center'>
                                    <p>Logout</p>
                                    <VscSignOut />
                                </div>,
                            handler: () => dispatch(logout(navigate))
                        },
                        btn2: {
                            text: 'Cancel',
                            handler: () => setConfirmationModal(null)
                        }
                    })}
                    className='flex flex-row px-8 py-2 items-center gap-3'>
                    <VscSignOut />
                    <p>Logout</p>
                </button>
            </div>

            { confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar