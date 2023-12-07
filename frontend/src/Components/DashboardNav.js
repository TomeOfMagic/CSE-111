import { faArrowLeft, faDashboard , faArrowRight, faShoppingBag , faUserGroup , faRightFromBracket, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userimg from "../img/usericon/user.png";
import {Link} from 'react-router-dom';

import userimg2 from "../img/usericon/user1.png";
import userimg3 from "../img/usericon/user3.png";
import React, { useState , useEffect} from "react";
import { BiHappyBeaming } from "react-icons/bi";
import axios from "axios";

export default function DashboardNav(props){
    const [isClose , setisClose] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");
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

    const logout = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/admin/logout`, {}, {
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${props.token}`
            },
        })
        .then((resp) => {
            props.removeToken();
            alert(resp.data.msg);
            window.location.href = '/Admin/Login';
        })
        .catch((error) => {
            console.error(error); // Changed to console.error for logging errors
        });
    }

    useEffect(() => {
        selectRandomImage();
    }, []); 
    
    return (
        <div className={`cursor-pointer transition-all relative h-screen ease-in-out delay-100 left-0 duration-1000 p-6 ${!isClose ? " w-[450px] " : " w-[190px]"} shadow-xl bg-gray-800`}>
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
                            <span>{props.name}</span>
                        </div>
                    }
                </div>
                <hr className=" border-2"></hr>
                <div className="space-y-12">
                    {!isClose? 
                        (
                            <>
                                <div onClick={() => handleTabClick("Dashboard")}  className={`${isActive("Dashboard")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faDashboard} />
                                    <Link 
                                        to =  "/Admin/AdminPage"
                                        className=" text-xl">Dashboard
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Employee")}  className={` ${isActive("Employee")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
                                    <Link 
                                        to = "/Admin/EmployeePage"
                                        className=" text-xl">Employee
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Services")} className={` ${isActive("Services")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon className="text-2xl" icon={faShoppingBag} />
                                    <Link
                                        to = "/Admin/ServicePage"
                                        className=" text-xl">
                                        Services
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Customer")} className={` flex ${isActive("Customer")} rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <BiHappyBeaming className=" text-3xl" />
                                    <Link
                                        to = "/Admin/CustomerPage" 
                                        className=" text-xl -ml-2">
                                        Customer
                                    </Link>
                                </div>
                                <div onClick={logout} className={` flex ${isActive("Logout")} w-4/5 bg-gray-600 justify-center text-center absolute lg:bottom-20 rounded-full  text-white space-x-6 p-4`}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="text-3xl" />
                                    <button className=" ">
                                        <span className="text-xl">Log Out</span>
                                    </button>
                                </div>
                            </>
                        ):(
                            <>
                                <div  onClick={() => handleTabClick("Dashboard")}  className={`${isActive("Dashboard")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <Link to="/Admin/AdminPage" className=" text-white">
                                        <FontAwesomeIcon className="text-2xl" icon={faDashboard} />
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Employee")}  className={`${isActive("Employee")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <Link to = "/Admin/EmployeePage" className=" text-white">
                                        <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Services")}  className={`${isActive("Services")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <Link to="/Admin/ServicePage" className=" text-white ">
                                        <FontAwesomeIcon className="text-2xl" icon={faShoppingBag} />
                                    </Link>
                                </div>
                                <div onClick={() => handleTabClick("Customer")}  className={`${isActive("Customer")} text-center rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <Link to="/Admin/CustomerPage" className=" text-white">
                                        <FontAwesomeIcon icon={faFaceSmile} className=" text-2xl" />
                                    </Link>
                                </div>
                                <div onClick={logout}  className={`${isActive("Logout")} absolute bottom-20 left-1/3 rounded-full hover:bg-sky-300 text-white space-x-6 p-4`}>
                                    <button className=" text-white">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />
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