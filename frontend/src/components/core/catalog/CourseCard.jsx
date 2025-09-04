import React, { useEffect, useState } from 'react'
import { getAverageRating } from '../../../operations/courseDetailApi'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
    const [rating, setRating] = useState(0)

    useEffect(() => {
        (async () => {
            const res = await getAverageRating(course._id)
            setRating(res)
        })()
    }, [course])

    // console.log(course)

    return (
        <Link to={`/course/${course._id}`} className='flex flex-col hover:scale-[104%] transition-all duration-200'>
            <img
                className='w-[22rem] h-52 object-cover object-center rounded-lg'
                src={course.thumbnail}
                alt=""
            />
            <p className='mt-2'>{course.courseName}</p>
            <p className='text-richblack-200'>{course.instructor.firstName} {course.instructor.lastName}</p>

            <div className="flex gap-2 items-center">
                <span className='text-yellow-50'>{rating}</span>

                <div className="flex items-center pb-1">
                    <StarRatings
                        rating={rating}
                        starRatedColor="#FFD60A"
                        starEmptyColor="#6E727F"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                    />
                </div>

                <p className='text-richblack-50'>
                    <span>
                        ({course.ratingAndReviews.length}
                    </span> Ratings)
                </p>
            </div>

            <p className='text-lg'>Rs. <span>{course.price}</span></p>
        </Link>
    )
}

export default CourseCard
