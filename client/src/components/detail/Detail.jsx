import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail, Clear } from "../../actions/index";

import detail from "../detail/detail.module.css"
import { Link } from "react-router-dom";
import navBar from "../navBar/NavBar"
import NavBar from "../navBar/NavBar";

export default function Detail(){
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.details);
    console.log(myPokemon, "poke");
    
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
        return()=>{
            dispatch(Clear())
        }
    }, [dispatch])

    

    return(
        <div className={detail.contenedor}>
            <NavBar/>
            <Link to="/home">
                <button className={detail.volver}>
                    <img src="https://static4.depositphotos.com/1000335/354/i/600/depositphotos_3543164-stock-photo-arrow-left-icon-blue-isolated.jpg" alt="" />
                </button>
            </Link>
            <div className={detail.detalles}>
            {
                myPokemon.length > 0 ? 

                <div className={detail.contenedorCarta}>
                    <h5 className={detail.id}>{myPokemon[0].id}</h5>
                    <h2 className={detail.titulo}>{myPokemon[0].name}</h2>
                    <h4 className={detail.tipos}>{myPokemon[0].types + ""} </h4>
                    <img className={detail.img} src={myPokemon[0].image} alt={myPokemon[0].name} />
                    <div className={detail.contenedorCaracteristicas}>
                        <div className={detail.caracteristicas}>
                            <h5>Estadisticas</h5>
                            <h6>vida: {myPokemon[0].hp}</h6>
                            <h6>defensa: {myPokemon[0].defense}</h6>
                            <h6>ataque: {myPokemon[0].attack}</h6>
                            <h6>velocidad: {myPokemon[0].speed}</h6>
                        </div>
                        <div className={detail.caracteristicas}>
                            <h5>Caracteristicas</h5>
                            <h6>altura: {myPokemon[0].height}</h6>
                            <h6>peso: {myPokemon[0].weight}</h6>
                        </div>
                    </div>
                </div>

                : <span className={detail.loader}></span>
            }
            </div>
        </div>
    )
}
    

    