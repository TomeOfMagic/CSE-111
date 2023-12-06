import React from "react";
import DashboardNav from "../DashboardNav";
// import NavAdmin from "../Admin/Navbar";
import { Outlet} from "react-router";

export default function Main(props){
    return (
        <main className=" bg-white w-screen h-screen flex overscroll-x-none overflow-x-hidden overflow-y-hidden">
            <div className="flex-1"><DashboardNav name = {props.name} /></div>
            <div className="flex-auto"><Outlet/></div>
        </main>
    )
}