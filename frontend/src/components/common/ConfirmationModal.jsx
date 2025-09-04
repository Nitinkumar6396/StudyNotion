import React from 'react'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className='fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm bg-richblack-500/30'>
            <div className='w-screen h-[90vh] flex justify-center items-center'>
                <div className='bg-richblack-900 border border-richblack-300 rounded-md w-[23rem] p-6 flex flex-col gap-8'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-3xl font-semibold'>{modalData.text1}</h1>
                        <p className='text-richblack-200'>{modalData.text2}</p>
                    </div>

                    <div className='text-richblack-900 text-lg font-semibold flex flex-row gap-5'>
                        <button onClick={modalData.btn1.handler} className='px-5 py-2 bg-yellow-50 rounded-md'>
                            {modalData.btn1.text}
                        </button>

                        <button onClick={modalData.btn2.handler} className='px-5 py-2 bg-richblack-300 rounded-md'>
                            {modalData.btn2.text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal