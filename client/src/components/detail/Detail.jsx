import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../actions/index";

import detail from "../detail/detail.module.css"
import { Link } from "react-router-dom";

export default function Detail(){
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.details);
    console.log(myPokemon, "poke");
    
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    }, [dispatch])

    

    return(
        <div>
            <Link to="/home">
                <button>Volver</button>
            </Link>

            {
                myPokemon.length > 0 ? 

                <div>
                    <h5>{myPokemon[0].id}</h5>
                    <h2>{myPokemon[0].name}</h2>
                    <h4>{myPokemon[0].types}</h4>
                    <img src={myPokemon[0].image} alt={myPokemon[0].name} />
                    <h5>Estadisticas</h5>
                    <h6>vida: {myPokemon[0].hp}</h6>
                    <h6>defensa: {myPokemon[0].defense}</h6>
                    <h6>ataque: {myPokemon[0].attack}</h6>
                    <h6>velocidad: {myPokemon[0].speed}</h6>
                    <h5>altura: {myPokemon[0].height}</h5>
                    <h5>peso: {myPokemon[0].weight}</h5>
                </div>

                : <h2>No se encotro el pokemon</h2>
            }

            
        </div>
    )
}
    

    