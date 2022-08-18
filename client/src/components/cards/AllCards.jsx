import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import { getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import allCards from './allcards.module.css'

export default function AllCards(){

    //guardo el estado que contiene los pokemones 
    let estadoPokemons = useSelector((state) => state.pokemons)
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPokemons())
    }, [])

    return(
        <React.Fragment>
            <div>
                {/* Hago un mapeo con un ternario */}
                {
                    estadoPokemons.length > 0 ? estadoPokemons.map((p) => {
                        return(
                            <div key={p.id} className={allCards.card}>
                                <Link to={`/pokemon/${p.id}`}>
                                    <Cards onClick={()=>dispatch(getPokemons(p.id))} name={p.name} types={p.types} image={p.image} key={p.id}/>
                                 </Link>
                            </div>
                        )
                    })
                    : 
                    <h2>No se encontró ningún pokemon</h2>
                }
            </div>
        </React.Fragment>
    )
}
