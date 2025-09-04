import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CourseCard from './CourseCard'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CourseSlider = ({ courses }) => {
    const [slidesPerView, setSlidesPerView] = useState(3)
    const [shouldShowNavigation, setShouldShowNavigation] = useState(courses.length > 3)

    const updateSlidesPerView = () => {
        const width = window.innerWidth
        if (width < 640) setSlidesPerView(1)
        else if (width < 1024) setSlidesPerView(2)
        else setSlidesPerView(3)
    }

    useEffect(() => {
        updateSlidesPerView()
        window.addEventListener('resize', updateSlidesPerView)
        return () => window.removeEventListener('resize', updateSlidesPerView)
    }, [])

    useEffect(() => {
        setShouldShowNavigation(courses.length > slidesPerView)
    }, [courses.length, slidesPerView])

    return (
        <div className='relative'>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={slidesPerView}
                loop={shouldShowNavigation}
                navigation={shouldShowNavigation ? {
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                } : false}
                pagination={{ clickable: true }}
                autoplay={shouldShowNavigation ? { delay: 3000, disableOnInteraction: false } : false}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
            >
                {
                    courses.length > 0
                        ? courses.map((course, index) => (
                            <SwiperSlide key={index} className='p-2'>
                                <CourseCard course={course} />
                            </SwiperSlide>
                        ))
                        : <p className="text-center py-4">No courses available</p>
                }
            </Swiper>

            {shouldShowNavigation && (
                <>
                    <button className="custom-prev absolute top-1/3 -left-8 bg-richblack-700 rounded-full p-1">
                        <FaChevronLeft />
                    </button>
                    <button className="custom-next absolute top-1/3 -right-8 bg-richblack-700 rounded-full p-1">
                        <FaChevronRight />
                    </button>
                </>
            )}
        </div>
    )
}

export default CourseSlider
