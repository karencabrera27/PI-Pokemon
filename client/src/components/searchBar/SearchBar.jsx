import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPokemonName, getPokemons } from "../../actions";
import { useNavigate } from 'react-router-dom';
import search from '../searchBar/searchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    function handleInputChange(e) {
        // e.preventDefault();
        dispatch(getPokemonName(e))
        navigate("/home")
        // console.log(name)
    }

    return (
        <div className={search.contenedor}>
            <input type="text" value={name} placeholder="Buscar..." onChange={(e) => { setName(e.target.value); handleInputChange(e.target.value)}}  className={search.input} />
            
        </div>
    )
}