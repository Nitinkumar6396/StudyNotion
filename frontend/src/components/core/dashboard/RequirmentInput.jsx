import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const RequirmentInput = ({ value = [], errors, onChange }) => {

  const [reqList, setReqList] = useState(value)
  const [req, setReq] = useState('')
  const { course, editCourse } = useSelector(state => state.course)

  const AddReq = () => {
    const trimmedReq = req.trim()
    if (trimmedReq && !reqList.includes(trimmedReq)) {
      const newReq = [...reqList, trimmedReq]
      setReqList(newReq)
      onChange(newReq)
      setReq('')
    }
  }

  const removeReq = (removeIndex) => {
    const newReq = reqList.filter((_, idx) => idx !== removeIndex)
    setReqList(newReq)
    onChange(newReq)
  }

  useEffect(() => {
    if (editCourse && course) {
      setReqList(course?.instruction)
      onChange(course?.instruction)
    }
    else {
      setReqList([])
      onChange([])
    }
  }, [editCourse, course, onChange])

  return (
    <div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="courseRequirement" className='text-sm'>Requirements/Instructions <span className='text-red-500'>*</span></label>
        <input
          type="text"
          value={req}
          id='courseRequirement'
          onChange={(e) => setReq(e.target.value)}
          className='bg-richblack-900 rounded-md p-[.65rem]'
        />
        {errors?.courseRequirement && <span className='text-red-500 text-sm'>{errors?.courseRequirement.message}</span>}
        <button
          type='button'
          onClick={AddReq}
          disabled={!req.trim()}
          className='text-start text-yellow-50 font-semibold'>
          Add
        </button>
        <ul className='list-disc pl-4'>
          {
            reqList?.length > 0 && reqList.map((item, index) => (
              <li key={index} className=''>
                <div className='flex flex-row items-center gap-2'>
                  <p>{item}</p>
                  <div onClick={() => removeReq(index)} className='cursor-pointer text-red-500 hover:text-red-300'>
                    <RxCross2 size={22} strokeWidth={1} />
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default RequirmentInput