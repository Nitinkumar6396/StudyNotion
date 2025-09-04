import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import * as icons from 'react-icons/vsc'
import * as icon from "react-icons/io5";


const DashLink = ({data}) => {

    const Icon = icons[data?.icon] || icon[data?.icon]
    const location = useLocation()

  return (
    <div>
        <NavLink to={data?.path}>
            <div className={`flex flex-row gap-3 px-8 py-2 items-center ${location.pathname === data?.path ? "bg-richblack-900 border-l-2 border-yellow-50 text-yellow-50" : ""}`}>
                <Icon /> 
                <p>{data?.name}</p>
            </div>
        </NavLink>
    </div>
  )
}

export default DashLink