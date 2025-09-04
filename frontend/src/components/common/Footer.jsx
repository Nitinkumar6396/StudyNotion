import Logo_Full_Light from "../../assets/Logo/Logo-Full-Light.png"
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
    return (
        <div className="bg-richblack-800 w-full">
            <div className="flex w-11/12 gap-20 mx-auto text-white justify-between py-10">
                <div className="flex w-[50%] justify-between">
                    <div className="flex flex-col gap-2">
                        <img width="80%" src={Logo_Full_Light} alt="" />
                        <h1 className="text-xl font-semibold">Company</h1>
                        <div className="flex flex-col gap-1 text-gray-400 text-sm">
                            {
                                ['About', 'Careers', 'Affiliates'].map((item, index) => {
                                    return (
                                        <Link key={index}>
                                            {item}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-semibold">Resources</h1>
                        <div className="flex flex-col gap-1 text-gray-400 text-sm">
                            {
                                Resources.map((item, index) => {
                                    return (
                                        <Link className="" key={index}>
                                            {item}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-semibold">Plans</h1>
                            <div className="flex flex-col gap-1 text-gray-400 text-sm">
                                {
                                    Plans.map((item, index) => {
                                        return (
                                            <Link key={index}>
                                                {item}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-semibold">Community</h1>
                            <div className="flex flex-col gap-1 text-gray-400 text-sm">
                                {
                                    Community.map((item, index) => {
                                        return (
                                            <Link key={index}>
                                                {item}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-[50%]">
                    <div className="flex justify-between ">
                        {
                            FooterLink2.map((item, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <h1 className="text-xl font-semibold">{item.title}</h1>
                                        <div className="flex flex-col gap-1 text-gray-400 text-sm">
                                        {
                                            item.links.map((ele, ind) => {
                                                return (
                                                    <Link className="flex flex-col" to={ele.link} key={ind}>
                                                        {ele.title}
                                                    </Link>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <hr className="w-11/12 mx-auto text-gray-300"/>
            <div className="w-11/12 mx-auto flex flex-row justify-between py-4 text-gray-400 text-sm">
                <div className="flex flex-row gap-6 cursor-pointer">
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                </div>

                <div>
                Made with <span className="text-red-500">♥</span> NitinKumar © 2025 Studynotion
                </div>
            </div>
        </div>
    )
}

export default Footer