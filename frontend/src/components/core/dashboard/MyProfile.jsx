import { useSelector } from 'react-redux'
import EditBtn from './EditBtn'

const MyProfile = () => {
  const { user } = useSelector(state => state.profile)

  return (
    <div className='w-full px-4 sm:px-6 md:px-12 py-6'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-2xl sm:text-3xl font-semibold'>My Profile</h1>

        {/* Profile Header */}
        <div className='flex flex-col md:flex-row items-start md:items-center px-4 py-6 border border-richblack-500 bg-richblack-800 rounded-md justify-between gap-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
            <img
              className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full'
              src={user.image}
              alt=''
            />
            <div className='flex flex-col'>
              <h3 className='text-lg sm:text-xl font-semibold'>
                {user.firstName} {user.lastName}
              </h3>
              <p className='text-sm text-richblack-100'>{user.email}</p>
            </div>
          </div>
          <EditBtn />
        </div>

        {/* About Section */}
        <div className='flex flex-col md:flex-row items-start md:items-center px-4 py-6 border border-richblack-500 bg-richblack-800 rounded-md justify-between gap-6'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>About</h3>
            <p className='text-sm text-richblack-100'>
              {user?.additionalDetails?.about || 'Write something about yourself'}
            </p>
          </div>
          <EditBtn />
        </div>

        {/* Personal Details */}
        <div className='flex flex-col px-4 py-6 border border-richblack-500 bg-richblack-800 rounded-md gap-6'>
          <div className='flex flex-row w-full justify-between items-center'>
            <h3 className='text-lg font-semibold'>Personal Details</h3>
            <EditBtn />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
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
              {user?.additionalDetails?.contactNumber ? (
                <p>+{user.additionalDetails.contactNumber}</p>
              ) : (
                <p>-</p>
              )}
            </div>

            <div className='flex flex-col'>
              <h2 className='text-sm text-richblack-300'>Gender</h2>
              <p>{user?.additionalDetails?.gender || '-'}</p>
            </div>

            <div className='flex flex-col'>
              <h2 className='text-sm text-richblack-300'>Date of Birth</h2>
              <p>{user?.additionalDetails?.dateOfBirth || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
