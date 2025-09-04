import React from 'react'
import Sidebar from '../components/core/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const Dashboard = () => {
    return (
        <>
            <div className='flex h-[90vh] bg-richblack-900 text-richblack-5'>

                <Sidebar />

                <div style={{ width: 'calc(100vw - 15rem)', overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Dashboard
