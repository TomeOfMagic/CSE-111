import React from "react";
import DashboardNav from "../DashboardNav";
import NavAdmin from "../Admin/Navbar";
import { Outlet} from "react-router";

export default function Main(props){
    return (
        <main className=" bg-white w-screen h-screen">
            <DashboardNav />
            <Outlet></Outlet>
        </main>
    )
}