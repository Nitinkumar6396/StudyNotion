import React from 'react'

const SaveBtn = ({ text = 'save', disable }) => {
  return (
    <div className='flex w-full justify-end -mt-6'>
      <button
        disabled={disable}
        className={`bg-yellow-50 mt-4 text-richblack-900 font-semibold px-5 py-2 rounded-md ${disable ? 'opacity-70 cursor-not-allowed' : ''}`}>
        {text}
      </button>
    </div>
  )
}

export default SaveBtn