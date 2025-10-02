import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { buyCourses } from "../../../operations/paymentApi"
import IconBtn from "../../common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const [isBuying, setIsBuying] = useState(false)
  const {user} = useSelector(state => state.profile)
  const dispatch = useDispatch()

  const handleBuyCourse = async () => {
    if (isBuying || cart.length === 0) return

    setIsBuying(true)
    const courses = cart.map((course) => course._id)
    
    try {
      await buyCourses(courses, navigate, user, setIsBuying, dispatch)
    } catch (error) {
      console.error(error)
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <div className="w-60 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text={isBuying ? "Processing..." : "Buy Now"}
        onclick={handleBuyCourse}
        customClasses={`w-full justify-center ${isBuying ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isBuying || cart.length === 0}
      />
    </div>
  )
}


