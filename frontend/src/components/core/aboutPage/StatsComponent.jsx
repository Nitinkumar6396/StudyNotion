import React from 'react'

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className='bg-richblack-800'>
      <div className='w-11/12 mx-auto grid grid-cols-4 py-8'>
        {
          Stats.map((item,index) => {
            return (
              <div key={index} className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-semibold'>{item.count}</h1>
                <p className='text-base text-richblack-300'>{item.label}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default StatsComponent