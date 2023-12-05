import { faArrowLeft, faArrowRight, faShoppingBag , faUserCheck, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userimg from "../img/usericon/user.png";
import userimg2 from "../img/usericon/user1.png";
import userimg3 from "../img/usericon/user3.png";
import React, { useState , useEffect} from "react";
import { BiHappyBeaming , BiArrowToRight  } from "react-icons/bi";

export default function DashboardNav(props){
    const [isClose , setisClose] = useState(false);
    const [activeTab, setActiveTab] = useState("Admin");
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const isActive = (tabName) => {
        return activeTab === tabName ? "bg-sky-600" : "";
    };
    const images = [userimg, userimg2, userimg3];

    const [currentImage, setCurrentImage] = useState(images[0]);

    const selectRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]);
    };

    useEffect(() => {
        selectRandomImage();
    }, []); 
    
    return (
        <div className={`fixed top-0 bottom-0 cursor-pointer transition-all ease-in-out delay-100 left-0 duration-1000 p-6 ${!isClose ? " w-[400px] " : " w-[190px]"} shadow-xl bg-gray-800`}>
            <div onClick={() => setisClose(!isClose)} className= "cursor-pointer rounded-full px-4 py-3 absolute top-4 bg-gray-200 -right-5">
                {!isClose?
                    (<FontAwesomeIcon className="text-2xl text-sky-600 " icon={faArrowLeft} />):
                    (<FontAwesomeIcon className="text-2xl text-sky-600 " icon={faArrowRight} />)
                }
            </div>
            <div className=" flex flex-col justify-center space-y-12">
                <div className=" flex items-center space-x-12 text-center">
                    <div className=" hover:opacity-80 shadow-lg rounded-full  bg-gradient-to-l from-green-200 via-green-400 to-purple-700">
                        <img className=" w-full h-full " src={currentImage} />
                    </div>
                    {!isClose &&
                        <div className=" text-2xl transition-opacity font-Poppins text-white">
                            {/* <span>{props.name}</span> */}
                            <span>Admin 4</span>
                        </div>
                    }
                </div>
                <hr className=" border-2"></hr>
                <div className="space-y-12">
                    {!isClose? 
                        (
                            <>
                                <div onClick={() => handleTabClick("Admin")}  className={`${isActive("Admin")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faUserCheck} />
                                    <button className="">
                                        <span className="text-xl">Admin</span>
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Employee")}  className={` ${isActive("Employee")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
                                    <button className=" ">
                                        <span className="text-xl">Employee</span>
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Services")} className={` ${isActive("Services")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faShoppingBag} />
                                    <button className=" ">
                                        <span className="text-xl">Services</span>
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Customer")} className={` flex ${isActive("Customer")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <BiHappyBeaming className=" text-3xl" />
                                    <button className=" ">
                                        <span className="text-xl -ml-2">Customer</span>
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Logout")} className={` flex ${isActive("Logout")} w-4/5 bg-gray-600 justify-center text-center absolute bottom-20 rounded-full  text-white space-x-6 p-4`}>
                                    <BiArrowToRight className="text-3xl" />
                                    <button className=" ">
                                        <span className="text-xl -ml-2">Log Out</span>
                                    </button>
                                </div>
                            </>
                        ):(
                            <>
                                <div  onClick={() => handleTabClick("Admin")}  className={`${isActive("Admin")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white">
                                        <FontAwesomeIcon className="text-2xl" icon={faUserCheck} />
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Employee")}  className={`${isActive("Employee")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white">
                                        <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Services")}  className={`${isActive("Services")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white ">
                                        <FontAwesomeIcon className="text-2xl" icon={faShoppingBag} />
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Customer")}  className={`${isActive("Customer")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white">
                                        <BiHappyBeaming className=" text-2xl" />
                                    </button>
                                </div>
                                <div onClick={() => handleTabClick("Customer")}  className={`${isActive("Customer")} absolute bottom-20 left-1/3 rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white">
                                        <BiArrowToRight className="text-3xl" />
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}