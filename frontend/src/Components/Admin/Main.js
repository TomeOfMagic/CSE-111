import React from "react";
import useToken from "../UseToken";
import NavAdmin from "../NavBar";
import { Outlet} from "react-router";

export default function Main(props){
    return (
        <>
            <NavAdmin token = {props.token} removeToken = {props.removeToken} setToken = {props.setToken} />
            <Outlet></Outlet>
        </>
    )
}