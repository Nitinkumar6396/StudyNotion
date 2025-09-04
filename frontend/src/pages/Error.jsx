import React from "react"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ code = 404, message = "Oops! Page not found." }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-richblack-900 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500">{code}</h1>
        <p className="mt-4 text-lg text-richblack-100">{message}</p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-200 transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
