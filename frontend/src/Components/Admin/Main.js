import React from "react";
import DashboardNav from "../DashboardNav";
// import NavAdmin from "../Admin/Navbar";
import { Outlet} from "react-router";

export default function Main(props){
    return (
        <main className=" bg-white w-screen h-screen flex overscroll-x-none overflow-y-hidden overflow-x-hidden">
            <div className="flex"><DashboardNav token = {props.token} removeToken = {props.removeToken} setToken={props.setToken} name = {props.name} /></div>
            <div className="flex-auto">
                <Outlet/>
            </div>
        </main>
    )
}