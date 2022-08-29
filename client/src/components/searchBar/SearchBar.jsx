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


    // function handleSubmit(e){
    //     setName(e.target.value)
    //     e.preventDefault()
    //     dispatch(getPokemonName(name))
    //     navigate("/home");
    // }

    return (
        <div className={search.contenedor}>
            <input type="text" value={name} placeholder="Buscar..." onChange={(e) => { setName(e.target.value); handleInputChange(e.target.value)}}  className={search.input} />
            {/* <button type="submit" className={search.button}>
                <img src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-icono-de-busqueda.png" height="20px" width="20px" alt="" />
            </button> */}
        </div>
    )
}