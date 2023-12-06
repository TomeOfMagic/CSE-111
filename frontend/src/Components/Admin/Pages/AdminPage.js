import { faCartShopping, faFaceLaugh, faMoneyBill, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React , {useState , useEffect} from "react";
import Example from "../../Chart";
import BasicDateCalendar from "../../Calendar";
import axios from "axios";

export default function AdminPage(props){

    const [data , setData] = useState({})

    function getData(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin/getData1` ,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${props.token}`
                },
            }
        )
        .then((resp) => {
            const res = resp.data
            res.access_token && props.setToken(res.access_token);
            setData(res.data);
        })
        .catch(function(error){
            console.log(error);
            window.location.href = "/Login";
        });
    }

    useEffect(() => {
        getData();
    } , []);

    return (
        <>
            <div className="p-12 space-y-6 h-screen w-full overflow-y-hidden overscroll-x-none">
                <h1 className="text-black font-Roboto font-bold text-3xl">Dashboard</h1>
                <div className=" flex gap-5">
                    <div className="h-24 cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 duration-500 shadow-md bg-sky-600 flex-auto w-full">
                        <div className=" p-3 space-x-3 text-center">
                            <FontAwesomeIcon className="text-xl text-white" icon={faFaceLaugh} />
                            <span className=" font-Lora text-lg text-white">Total Customer</span>
                        </div>
                        <div className="text-center">
                            <span className=" font-lato text-white text-2xl">{data.customer}</span>
                        </div>
                    </div>
                    <div className=" flex-auto w-full">
                        <div className="h-24 cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 duration-500 shadow-md bg-sky-600 flex-auto w-full">
                            <div className=" p-3 space-x-3 text-center">
                                <FontAwesomeIcon className="text-xl text-white" icon={faUserFriends} />
                                <span className=" font-Lora text-lg text-white">Total Employee</span>
                            </div>
                            <div className="text-center">
                                <span className=" font-lato text-white text-2xl">{data.employee}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto w-full">
                        <div className="h-24 cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 duration-500 shadow-md bg-sky-600 flex-auto w-full">
                            <div className=" p-3 space-x-3 text-center">
                                <FontAwesomeIcon className="text-xl  text-white" icon={faCartShopping} />
                                <span className=" font-Lora text-lg text-white">Total Services</span>
                            </div>
                            <div className="text-center">
                                <span className=" font-lato text-white text-2xl">{data.service}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 duration-500 flex-auto p-4 w-full">
                        <Example token = {props.token} setToken = {props.setToken} />
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all ease-in-out delay-100 duration-500 flex-auto p-4 w-full">
                        <BasicDateCalendar />
                    </div>
                </div>
            </div>
        </>
    );
};