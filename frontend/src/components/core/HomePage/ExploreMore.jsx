import React, { useState } from "react"
import HighlightText from "./HighlightText"
import { HomePageExplore } from "../../../../data/homepage-explore"
import { HiUsers } from "react-icons/hi2"
import { ImTree } from "react-icons/im"

const ExploreMore = () => {
  const [currTab, setCurrTab] = useState(HomePageExplore[0].tag)
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currCard, setCurrCard] = useState(HomePageExplore[0].courses[0])

  const changeCurrTab = (item) => {
    setCurrTab(item.tag)
    setCourses(item.courses)
    setCurrCard(item.courses[0])
  }

  return (
    <div className="w-11/12 mt-28 flex flex-col items-center mx-auto text-center">
      {/* Heading */}
      <p className="text-3xl sm:text-4xl font-semibold">
        Unlock the <HighlightText text={"Power of Code"} />
      </p>
      <p className="text-base text-richblack-300 my-1">
        Learn to Build Anything You Can Imagine
      </p>

      {/* Tabs */}
      <div className="flex bg-richblack-800 gap-2 sm:gap-4 mt-5 px-2 py-1 rounded-full">
        {HomePageExplore.map((item, index) => (
          <div
            key={index}
            onClick={() => changeCurrTab(item)}
            className={`text-xs sm:text-base flex flex-wrap items-center cursor-pointer px-2 sm:px-4 py-1 rounded-full transition-all duration-200 ${
              currTab === item.tag
                ? "bg-richblack-900 text-richblack-5"
                : "text-richblack-200 hover:text-richblack-50"
            }`}
          >
            {item.tag}
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="-mt-5 flex flex-wrap gap-6 justify-center relative top-16">
        {courses.map((item, index) => {
          const isActive = currCard === item
          return (
            <div
              key={index}
              onClick={() => setCurrCard(item)}
              className={`flex flex-col w-full min-h-64 sm:w-[300px] cursor-pointer justify-between transition-all duration-200 ${
                isActive
                  ? "bg-richblack-5 text-richblack-800 shadow-yellow-50 shadow-[12px_12px]"
                  : "bg-richblack-800 text-richblack-200"
              }`}
            >
              {/* Card Content */}
              <div className="flex flex-col gap-3 text-start px-4 py-5">
                <p
                  className={`text-lg sm:text-xl font-semibold ${
                    isActive ? "text-richblack-900" : "text-richblack-5"
                  }`}
                >
                  {item.heading}
                </p>
                <p
                  className={`text-sm sm:text-base ${
                    isActive ? "text-richblack-600" : "text-richblack-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Footer */}
              <div
                className={`flex flex-row justify-between border-t-[1.5px] border-dashed border-richblack-100 px-4 py-2 ${
                  isActive ? "text-richblack-700" : "text-richblack-400"
                }`}
              >
                <div className="flex flex-row items-center gap-2">
                  <HiUsers />
                  {item.level}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <ImTree />
                  {item.lessionNumber}
                  <p>Lessons</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMore
