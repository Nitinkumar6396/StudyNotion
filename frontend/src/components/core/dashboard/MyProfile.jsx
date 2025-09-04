import { useSelector } from 'react-redux'
import EditBtn from './EditBtn'

const MyProfile = () => {

    const { user } = useSelector(state => state.profile)
    // console.log(user)

    return (
        <div className=''>
            <div className='p-12 flex flex-col gap-8 justify-center'>
                <h1 className='text-3xl font-semibold'>My Profile</h1>

                <div className='flex flex-row px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md items-center justify-between gap-6'>
                    <div className='flex flex-row gap-3 items-center'>
                        <img className='w-16 h-16 object-cover rounded-full' src={user.image} alt="" />
                        <div className='flex flex-col'>
                            <h3 className='text-lg font-semibold'>{user.firstName} {user.lastName}</h3>
                            <p className='text-sm text-richblack-100'>{user.email}</p>
                        </div>
                    </div>
                    <EditBtn />
                </div>

                <div className='flex flex-row px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md items-center justify-between gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-semibold'>About</h3>
                        <p className='text-sm text-richblack-100'>{user?.additionalDetails?.about || 'Write Something about Yourself'}</p>
                    </div>
                    <EditBtn />
                </div>

                <div className='flex flex-col px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md justify-between gap-6'>
                    <div className='flex flex-row w-full justify-between'>
                        <h3 className='text-lg font-semibold'>Personal Details</h3>
                        <EditBtn />
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>First Name</h2>
                            <p>{user.firstName}</p>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>Last Name</h2>
                            <p>{user.lastName}</p>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>Email</h2>
                            <p>{user.email}</p>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>Phone Number</h2>
                            {user?.additionalDetails?.contactNumber && <p>+{user?.additionalDetails?.contactNumber}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>Gender</h2>
                            {user?.additionalDetails?.gender && <p>{user?.additionalDetails?.gender}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='text-sm text-richblack-300'>Date of Birth</h2>
                            {user?.additionalDetails?.dateOfBirth && <p>{user?.additionalDetails?.dateOfBirth}</p>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyProfile