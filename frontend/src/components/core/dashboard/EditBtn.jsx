import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const EditBtn = () => {

    const navigate = useNavigate()

  return (
    <div>
        <button 
        onClick={() => navigate('/dashboard/settings')}
        className='flex flex-row gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold 
        px-5 py-2 rounded-md'>
            <p>Edit</p>
            <FiEdit />
        </button>
    </div>
  )
}

export default EditBtn