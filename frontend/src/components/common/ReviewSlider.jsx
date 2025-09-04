import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import StarRatings from "react-star-ratings"

import "swiper/css"

import axios from "axios"
import { toast } from "react-toastify"

const base_url = import.meta.env.VITE_APP_BASE_URL

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateLength = 105

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${base_url}/course/getAllRatingAndReview`
        )
        setReviews(data?.data || [])
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Unable to fetch rating & reviews")
      }
    })()
  }, [])

  // duplicate reviews if less than 4, so loop works
  const displayedReviews =
    reviews.length < 4 ? [...reviews, ...reviews, ...reviews] : reviews

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto text-richblack-5">
        <div className="mb-12 mt-8 mx-auto h-[184px] max-w-maxContentTab lg:max-w-maxContent">
          <Swiper
            modules={[Autoplay]}
            loop={displayedReviews.length >= 4}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              780: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {displayedReviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-base text-richblack-5">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-sm font-medium text-richblack-300">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review
                      ? review.review.length > truncateLength
                        ? `${review.review.slice(0, truncateLength)} ...`
                        : review.review
                      : "No review provided"}
                  </p>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review?.rating?.toFixed(1) || "0.0"}
                    </h3>
                    <div className="flex items-center pb-1">
                      <StarRatings
                        rating={review?.rating || 0}
                        starRatedColor="#FFD60A"
                        starEmptyColor="#6E727F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="18px"
                        starSpacing="2px"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider
