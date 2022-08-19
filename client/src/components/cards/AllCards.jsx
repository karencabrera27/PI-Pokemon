import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import { getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import allCards from './allcards.module.css'
import Paginado from "../pagination/Pagination";

export default function AllCards(){

    //guardo el estado que contiene los pokemones 
    let allPokemons = useSelector((state) => state.pokemons)
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPokemons())
    }, [])

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12)

    //indices
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;

    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return(
        <React.Fragment>
            <div>
                {/* Hago un mapeo con un ternario */}
                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                />

                {
                    allPokemons.length > 0 ? allPokemons.map((p) => {
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
