import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
// import Detail from "../detail/Detail";
import { getPokemons } from "../../actions/index";
// import { getDetail } from "../../actions/index";
import orderByName from "../../actions";
import { Link } from "react-router-dom";
import allCards from './allcards.module.css'
import Paginado from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { getTypes, filterPokemonsByTypes, filterCreated, getDetail } from "../../actions/index";

export default function AllCards(){
    const dispatch = useDispatch();
    //guardo el estado que contiene los pokemones 
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)
    console.log(allTypes, "types")
    
    // definición de estado para ordenamiento
    const [ orden, setOrden ] = useState('');

    // definicion de estados locales
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPerPage ] =  useState(12)

    // estado para renderizar detalles
    const [pokemons, setPokemons] = useState();

    // indices

    const indexLastRecipe = currentPage * pokemonsPerPage //9
    const indexFirstRecipe = indexLastRecipe - pokemonsPerPage // 0

    const currentPokemons = allPokemons.slice(indexFirstRecipe, indexLastRecipe);

    // paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    // función ordenamiento alfabético asc/desc 
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1) // para que ordene la primera página 
        setOrden(`Ordenado ${e.target.value}`)
    }
    
    // filtro pokemones creadas
    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    //filtro tipos
    function handleFilterTypes(e){
        // e.preventDefault()
        dispatch(filterPokemonsByTypes(e.target.value))
        // setCurrentPage(1)
        // setOrden(`Ordenado ${e.target.value}`)
    }

    // const handleDetail = (id) =>{
    //     e.preventDefault()
    //     let data = dispatch(getDetail(id))
    //     setPokemons()
    // }

    return(
        <React.Fragment>
            <div>
                <div className={allCards.filtroAtoZ}>
                    <label>Orden alfabético</label>
                    <select name="Asc/Desc" id="" onChange={e => handleSort(e)}>
                        <option value="all">All</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
                <div className={allCards.filtroTipos}>
                    <label>Tipos</label>
                    <select name="tipos" id="" onChange={(e) => {handleFilterTypes(e)}}>
                        <option value="all">All</option>

                        {
                            allTypes.map((e)=>
                                (
                                    <option value={e.name} key={e.name}>
                                        {e.name}
                                    </option>
                                )
                            )
                        }
                    </select>
                </div>
                <div className="filtroCreados">
                    <label>Creados/existentes</label>
                    <select name="creados" id="" onChange={e => handleFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="creado">creados</option>
                        <option value="existente">existente</option>
                    </select>
                </div>

                {/* Hago un mapeo con un ternario */}
                <Paginado 
                    pokemonsPerPage = { pokemonsPerPage }
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                />

                <SearchBar
                    setCurrentPage={setCurrentPage}
                />

                <div className={allCards.containerCards}>
                    {
                        currentPokemons.length? (currentPokemons.map((p) => {
                            return(
                                <div key={p.id}>
                                
                                    <Link to={`/pokemon/${p.id}`}>
                                        <Cards onClick={()=>dispatch(getDetail(p.id))} name={p.name} types={p.types} image={p.image} key={p.id}/>
                                    </Link>
                                    
                                </div>
                            );
                        }))
                        : 
                        <h2>No se encontró ningún pokemon</h2>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
