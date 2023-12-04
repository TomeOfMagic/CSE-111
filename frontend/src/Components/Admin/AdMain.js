import React from "react";
import NavAdmin from "../NavBar";

export default function Admin(props){
    return(
        <NavAdmin token = {props.token}/>
    )
}