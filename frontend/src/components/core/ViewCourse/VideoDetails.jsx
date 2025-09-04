import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { IoCaretBack, IoCaretForward } from "react-icons/io5"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { markLectureAsComplete } from "../../../operations/courseDetailApi"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [lecturesId, setLecturesId] = useState([])
  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!courseSectionData?.length) return
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
      return
    }

    const lecIds = courseEntireData?.courseContent?.flatMap(sec =>
      sec.subSections.map(sub => sub._id)
    )
    setLecturesId(lecIds || [])

    const currentSection = courseSectionData.find(sec => sec._id === sectionId)
    const currentVideo = currentSection?.subSections?.find(sub => sub._id === subSectionId)

    setVideoData(currentVideo || null)
    setPreviewSource(courseEntireData?.thumbnail)
    setVideoEnded(false)
  }, [courseSectionData, courseEntireData, courseId, sectionId, subSectionId, navigate])

  const isFirstVideo = () => lecturesId?.[0] === subSectionId
  const isLastVideo = () => lecturesId?.[lecturesId.length - 1] === subSectionId

  const findSectionBySubId = (subId) => {
    const sec = courseSectionData.find(section => section.subSections.some(sub => sub._id === subId))
    return sec ? { sectionId: sec._id } : {}
  }

  const goToNextVideo = () => {
    const currentIndex = lecturesId.indexOf(subSectionId)
    if (currentIndex < lecturesId.length - 1) {
      const nextSubId = lecturesId[currentIndex + 1]
      const { sectionId: nextSectionId } = findSectionBySubId(nextSubId)
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentIndex = lecturesId.indexOf(subSectionId)
    if (currentIndex > 0) {
      const prevSubId = lecturesId[currentIndex - 1]
      const { sectionId: prevSectionId } = findSectionBySubId(prevSubId)
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubId}`)
    }
  }

  const handleLectureCompletion = async () => {
    try {
      setLoading(true)
      const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId })
      if (res?.success) dispatch(updateCompletedLectures([subSectionId]))
    } catch (err) {
      console.error("Error completing lecture:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 text-richblack-5">
      {!videoData ? (
        previewSource ? (
          <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
        ) : (
          <p className="py-10 px-4 text-yellow-50">There is no lecture in this course</p>
        )
      ) : (
        <div className="relative mt-2">
          <video
            ref={playerRef}
            className="max-h-[70vh] w-full rounded-md"
            src={videoData.videoUrl}
            controls
            controlsList="nodownload"
            onEnded={() => setVideoEnded(true)}
          />

          {videoEnded && (
            <div className="absolute inset-0 z-20 grid place-content-center bg-gradient-to-t from-black/90 via-black/90 to-transparent backdrop-blur-sm">
              <div className="border p-6 rounded-lg bg-richblack-700/50 text-center">
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={handleLectureCompletion}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses={`text-xl max-w-max px-4 mx-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                )}

                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef.current) {
                      playerRef.current.currentTime = 0
                      playerRef.current.play()
                    }
                    setVideoEnded(false)
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[200px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button disabled={loading} onClick={goToPrevVideo} className="bg-richblack-700 pr-2 pl-1 py-1 rounded-md">
                      <div className="flex items-center gap-1">
                        <IoCaretBack /> <span>Prev</span>
                      </div>
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button disabled={loading} onClick={goToNextVideo} className="bg-richblack-700 pr-2 pl-1 py-1 rounded-md">
                      <div className="flex items-center gap-1">
                        <IoCaretForward /> <span>Next</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {videoData && (
        <div>
          <h1 className="mt-2 text-3xl font-semibold">{videoData?.title}</h1>
          <p className="pb-6 text-richblack-25">{videoData?.description}</p>
        </div>
      )}
    </div>
  )
}

export default VideoDetails
