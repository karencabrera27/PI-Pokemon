import React from "react";
import NavBar from "../navBar/NavBar";
import img from '../404/error.png'
import error from '../404/error.module.css';

export default function Error(){
    return(
        <>
            <NavBar/>
            <div className={error.container}>
                {/* <button>Volver</button> */}
            </div>
        </>
    )
}