import { useSelector } from "react-redux"

import RenderCartCourses from "../components/core/dashboard/RenderCartCourses"
import RenderTotalAmount from "../components/core/dashboard/RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6">
      <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-medium text-richblack-5">
        Cart
      </h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-sm sm:text-base text-richblack-400">
        {totalItems} Courses in Cart
      </p>

      {total > 0 ? (
        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-y-4 gap-x-6 lg:gap-x-10 items-start">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-10 sm:mt-14 text-center text-2xl sm:text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  )
}
