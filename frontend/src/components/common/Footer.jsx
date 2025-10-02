import Logo_Full_Light from "../../assets/Logo/Logo-Full-Light.png"
import { FooterLink2 } from "../../../data/footer-links"
import { Link } from "react-router-dom"

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]
const Plans = ["Paid memberships", "For students", "Business solutions"]
const Community = ["Forums", "Chapters", "Events"]

const Footer = () => {
  return (
    <div className="bg-richblack-800 w-full text-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row w-11/12 mx-auto justify-between gap-10 py-10">
        
        {/* Left Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          
          {/* Company */}
          <div className="flex flex-col gap-2">
            <img src={Logo_Full_Light} alt="StudyNotion Logo" className="w-[150px]" />
            <h1 className="text-xl font-semibold mt-2">Company</h1>
            <div className="flex flex-col gap-1 text-gray-400 text-sm">
              {["About", "Careers", "Affiliates"].map((item, index) => (
                <Link to="/" key={index} className="hover:text-gray-200 transition">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Resources</h1>
            <div className="flex flex-col gap-1 text-gray-400 text-sm">
              {Resources.map((item, index) => (
                <Link to="/" key={index} className="hover:text-gray-200 transition">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Plans + Community */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-xl font-semibold">Plans</h1>
              <div className="flex flex-col gap-1 text-gray-400 text-sm">
                {Plans.map((item, index) => (
                  <Link to="/" key={index} className="hover:text-gray-200 transition">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Community</h1>
              <div className="flex flex-col gap-1 text-gray-400 text-sm">
                {Community.map((item, index) => (
                  <Link to="/" key={index} className="hover:text-gray-200 transition">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {FooterLink2.map((item, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <div className="flex flex-col gap-1 text-gray-400 text-sm">
                  {item.links.map((ele, ind) => (
                    <Link
                      to={ele.link}
                      key={ind}
                      className="hover:text-gray-200 transition"
                    >
                      {ele.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-11/12 mx-auto border-gray-600" />

      {/* Bottom Section */}
      <div className="w-11/12 mx-auto flex flex-col sm:flex-row justify-between items-center py-4 text-gray-400 text-sm gap-3">
        <div className="flex flex-wrap gap-6 cursor-pointer">
          <p className="hover:text-gray-200">Privacy Policy</p>
          <p className="hover:text-gray-200">Cookie Policy</p>
          <p className="hover:text-gray-200">Terms</p>
        </div>

        <div>
          Made with <span className="text-red-500">♥</span> by <span className="font-medium">Nitin Kumar</span> © 2025 StudyNotion
        </div>
      </div>
    </div>
  )
}

export default Footer
