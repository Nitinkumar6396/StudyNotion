import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice.js'
import cartReducer from '../slices/cartSlice'
import categoryReducer from '../slices/categorySlice.js'
import courseReducer from '../slices/courseSlice.js'
import viewCourseReducer from '../slices/viewCourseSlice.js'

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    category:categoryReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
})

export default rootReducer