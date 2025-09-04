import React, { useEffect, useState } from 'react'

const WaitPage = () => {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      dots.length < 3 ? setDots(dots + '.') : setDots('')
    }, 500);
    return () => clearTimeout(timer)
  })
  return (
    <div className='flex justify-center items-center h-full'>
      <p className='min-w-24 text-yellow-50'>Please wait{dots}</p>
    </div>
  )
}

export default WaitPage