import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerfiyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/dashboard/MyProfile'
import Settings from './components/core/dashboard/Settings'
import InstructorDashboard from './pages/InstructorDashboard'
import MyCourses from './pages/MyCourses'
import AddCourse from './pages/AddCourse'
import EditCourse from './pages/EditCourse'
import Catalog from './pages/Catalog'
import Course from './pages/Course'
import Cart from './pages/Cart'
import EnrolledCourses from './pages/EnrolledCourses'
import { useSelector } from 'react-redux'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import ErrorPage from './pages/Error'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'

const App = () => {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-screen max-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <div className='overflow-y-scroll'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/catalog/:ctName' element={<Catalog />} />
          <Route path='/course/:courseId' element={<Course />} />
          <Route path='/login' element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />
          <Route path='/signup' element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          } />
          <Route path='/verify-email' element={
            <OpenRoute>
              <VerfiyEmail />
            </OpenRoute>
          } />
          <Route path='/reset-password' element={
            <OpenRoute>
              <ResetPassword />
            </OpenRoute>
          } />
          <Route path='/update-password/:token' element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          } />

          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } >
            <Route path='/dashboard/my-profile' element={<MyProfile />} />
            <Route path='/dashboard/settings' element={<Settings />} />
            {
              user?.accountType === 'Student' && (
                <>
                  <Route path='/dashboard/cart' element={<Cart />} />
                  <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
                </>
              )
            }
            {
              user?.accountType === 'Instructor' && (
                <>
                  <Route path='/dashboard/instructor' element={<InstructorDashboard />} />
                  <Route path='/dashboard/my-courses' element={<MyCourses />} />
                  <Route path='/dashboard/add-course' element={<AddCourse />} />
                  <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
                </>
              )
            }
          </Route>

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === 'Student' && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App