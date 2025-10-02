import { RiDeleteBin6Line } from "react-icons/ri"
import StarRatings from "react-star-ratings"
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
    <div className="flex flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-col sm:flex-row items-start md:items-center justify-between gap-4 ${indx !== cart.length - 1 ? "border-b border-b-richblack-400 pb-4 md:pb-6" : ""} ${indx !== 0 ? "mt-4 md:mt-6" : ""}`}
        >
          <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-6">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full max-w-xs h-36 md:w-[220px] md:h-[148px] rounded-lg object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-lg md:text-xl font-medium text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">{course?.category?.name}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-yellow-5">{ratings[course._id]}</span>
                <div className="mb-1">
                  <StarRatings
                    rating={ratings[course._id]}
                    starRatedColor="#FFD60A"
                    starEmptyColor="#6E727F"
                    numberOfStars={5}
                    name="rating"
                    starDimension="18px"
                    starSpacing="1px"
                  />
                </div>
                <span className="text-richblack-400 text-xs sm:text-sm">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-2 mt-2 md:mt-0">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 py-1 px-3 text-sm text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-2xl md:text-3xl font-medium text-yellow-100 mt-1 md:mt-6">₹ {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
