import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import AllCards from '../cards/AllCards';
import SearchBar from '../searchBar/SearchBar'
import { getPokemons } from '../../actions';

import home from '../home/home.module.css';

export default function Home(){
    // const dispatch = useDispatch();

    // const allPokemons = useSelector((state) => state.pokemons);

    // const [resultado, setResultado] = useState();

    // useEffect(
    //     () => {
    //         dispatch(getPokemons())
            
    //     }, [dispatch]
    // ) 

    return(
        <React.Fragment>
            <NavBar/>
            <SearchBar/>
            <div className={home.containerCards}>
                <AllCards/>
            </div>
        </React.Fragment>
        
    )
}