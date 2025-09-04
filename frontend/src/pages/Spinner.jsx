// import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

export function Spinner() {
  // const [dots, setDots] = useState("")

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDots((prev) => (prev.length < 3 ? prev + "." : ""))
  //   }, 500)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="flex justify-center flex-col h-[calc(100vh-3.5rem)] text-richblack-5 items-center w-full">
      <ClipLoader color="#FFD60A" size={45} />
      {/* <p className="mt-3 text-lg font-medium w-28">
        Please wait{dots}
      </p> */}
    </div>
  )
}
