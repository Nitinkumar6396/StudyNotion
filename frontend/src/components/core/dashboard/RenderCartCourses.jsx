import { RiDeleteBin6Line } from "react-icons/ri"
import StarRatings from 'react-star-ratings'
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../../slices/cartSlice"
import { useEffect, useState } from "react"
import { getAverageRating } from "../../../operations/courseDetailApi"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [ratings, setRatings] = useState({})

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingData = {}
      await Promise.all(
        cart.map(async (course) => {
          const res = await getAverageRating(course._id)
          ratingData[course._id] = res || 0
        })
      )
      setRatings(ratingData)
    }

    if (cart.length > 0) {
      fetchRatings()
    }
  }, [cart])

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 ? "border-b border-b-richblack-400 pb-6" : ""} ${indx !== 0 ? "mt-6" : ""}`}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">{course?.category?.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{ratings[course._id]}</span>
                <div className="mb-1">
                  <StarRatings
                    rating={ratings[course._id]}
                    starRatedColor="#FFD60A"
                    starEmptyColor="#6E727F"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </div>
                <span className="text-richblack-400">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
