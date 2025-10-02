import React, { useEffect, useState } from 'react';
import { getAverageRating } from '../../../operations/courseDetailApi';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const [rating, setRating] = useState(0);
    const [starDimension, setStarDimension] = useState("20px");

    // Effect to fetch the average rating for the course
    useEffect(() => {
        (async () => {
            const res = await getAverageRating(course._id);
            if (res) {
                setRating(res);
            }
        })();
    }, [course]);

    // Effect to handle responsive star sizes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setStarDimension("16px");
            } else {
                setStarDimension("20px");
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Link to={`/course/${course._id}`} className='flex flex-col gap-2 transition-all duration-200 group'>
            <div className="overflow-hidden rounded-lg">
                <img
                    className='w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
                    src={course.thumbnail}
                    alt={`${course.courseName} thumbnail`}
                />
            </div>
            <p className='text-base font-medium text-richblack-5'>{course.courseName}</p>
            <p className='text-sm text-richblack-300'>{course.instructor.firstName} {course.instructor.lastName}</p>

            <div className="flex gap-2 items-center">
                <span className='font-semibold text-yellow-50'>{rating.toFixed(1)}</span>

                <div className="flex items-center pb-1">
                    <StarRatings
                        rating={rating}
                        starRatedColor="#FFD60A"
                        starEmptyColor="#6E727F"
                        numberOfStars={5}
                        name="rating"
                        starDimension={starDimension}
                        starSpacing="1px"
                    />
                </div>
                <p className='text-sm text-richblack-100'>
                    ({course.ratingAndReviews.length} Ratings)
                </p>
            </div>
            <p className='text-xl font-semibold text-richblack-5'>₹{course.price}</p>
        </Link>
    );
};

export default CourseCard;