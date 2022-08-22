import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import AllCards from '../cards/AllCards';
// import { getPokemons } from '../../actions';

import home from '../home/home.module.css';

export default function Home(){
    
    return(
        <React.Fragment>
            <NavBar/>
            <div className={home.containerCards}>
                <AllCards/>
            </div>
        </React.Fragment>
        
    )
}