import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, linkto, active }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center text-base px-5 py-2 rounded-md font-medium ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </Link>
    )
}

export default Button