import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import axios from "axios";
import { setCompletedLectures } from "../../../slices/viewCourseSlice";

// Accept the new props to control the sidebar's state
export default function VideoDetailsSidebar({ setReviewModal, isSidebarOpen, setIsSidebarOpen }) {
  const [activeStatus, setActiveStatus] = useState(null);
  const [videoBarActive, setVideoBarActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sectionId, subSectionId } = useParams();
  const base_url = import.meta.env.VITE_APP_BASE_URL;

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData?.length) return;

    const currentSectionIndx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    if (currentSectionIndx === -1) return;

    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSections?.findIndex(
      (sub) => sub._id === subSectionId
    );

    (async () => {
      const res = await axios.get(`${base_url}/course/getCourseProgress`, {
        params: { courseId: courseEntireData._id },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setCompletedLectures(res.data.data.completedVideos));
      }
    })();

    const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSections?.[currentSubSectionIndx]?._id;
    setActiveStatus(courseSectionData[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId || null);
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId, base_url, dispatch]);

  return (
    <>
      {/* Main Sidebar Container with responsive classes */}
      <div
        className={`flex h-full w-60 sm:w-80 max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:h-[calc(100vh-3.5rem)]`}
      >
        {/* Header */}
        <div className="mx-5 flex flex-col gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            {/* Back button */}
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
              title="Back"
            >
              <IoIosArrowBack size={25} />
            </div>

            {/* Review Button */}
            <IconBtn text="Add Review" customClasses="ml-auto" onclick={() => setReviewModal(true)} />
          </div>

          {/* Course Title + Progress */}
          <div className="flex flex-col">
            <p className="font-semibold">{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-300">
              {completedLectures?.length || 0} / {totalNoOfLectures || 0}
            </p>
          </div>
        </div>

        {/* Sections + Subsections */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto">
          {courseSectionData?.map((course, index) => (
            <div className="mt-2 cursor-pointer text-sm text-richblack-5" key={course._id || index}>
              {/* Section Header */}
              <div
                className="flex flex-row justify-between bg-richblack-600 px-5 py-4"
                onClick={() => setActiveStatus(course?._id)}
              >
                <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                <div className="flex items-center gap-3">
                  <span className={`transition-transform duration-500 ${activeStatus === course?._id ? "rotate-0" : "rotate-180"}`}>
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course?.subSections?.map((topic) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id ? "bg-yellow-800 font-semibold" : "hover:bg-richblack-900"}`}
                      key={topic._id}
                      onClick={() => {
                        navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`);
                        setVideoBarActive(topic._id);
                        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
                      }}
                    >
                      <input type="checkbox" checked={completedLectures.length && completedLectures?.includes(topic?._id)} readOnly/>
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile view, appears when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
}