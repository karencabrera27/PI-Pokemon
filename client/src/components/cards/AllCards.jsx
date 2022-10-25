import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import { Link } from "react-router-dom";

import orderByName from "../../actions";

import allCards from './allcards.module.css'
import Paginado from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { 
    getTypes, 
    filterPokemonsByTypes, 
    filterCreated,
    filterByAttack, 
    getDetail, 
    getPokemons, 
    ActiveLoading 
} from "../../actions/index";

export default function AllCards(){
    const dispatch = useDispatch();
    //guardo el estado que contiene los pokemones 
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)
    const isLoading = useSelector((state) => state.isLoading)
    console.log(allTypes, "types")
    
    // definición de estado para ordenamiento
    const [ orden, setOrden ] = useState('');

    // definicion de estados locales
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonsPerPage ] =  useState(12);

    // indices

    const indexLastPokemon = currentPage * pokemonsPerPage //12
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage // 0

    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);


    // paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(ActiveLoading())
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])
    
    // para que tire una sola pagina
    useEffect(() => {
        setCurrentPage(1);
      }, [allPokemons.length,setCurrentPage]);

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

    //filtro por ataque
    function handleFilterByAttack(e){
        e.preventDefault()
        dispatch(filterByAttack(e.target.value))
        setCurrentPage(1) // para que ordene la primera página 
        setOrden(`Ordenado ${e.target.value}`)
    }
    //filtro tipos
    function handleFilterTypes(e){
        
        dispatch(filterPokemonsByTypes(e.target.value))
    }

    // funcion para el boton
    function handleClick(e){
        e.preventDefault();
        // esto resetea
        dispatch(getPokemons());
    }

    return(
        <React.Fragment>
            <div className={allCards.contenedor}>
                <div className={allCards.barra}>
                    <div className={allCards.contBotones}>
                        <Link to="/pokemon">
                            <button className={allCards.crear}>Crear Pokemon</button>
                        </Link>
                        <button className={allCards.crear} onClick={e => handleClick(e)}>Volver a cargar pokemons</button>
                    </div>
                    <div className={allCards.contenedorFiltros}>
                        <div className={allCards.filtroAtoZ}>
                            <label className={allCards.labels}>Orden alfabético</label>
                            <select name="Asc/Desc" id="" onChange={e => handleSort(e)} className={allCards.select}>
                                <option value="all">All</option>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </div>
                        <div className={allCards.filtroTipos}>
                            <label className={allCards.labels}>Tipos</label>
                            <select name="tipos" id="" onChange={(e) => {handleFilterTypes(e)}} className={allCards.select}>
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
                        <div className={allCards.filtroAtaque}>
                            <label className={allCards.labels}>Ataque</label>
                            <select name="ataque" onChange={e => handleFilterByAttack(e)} className={allCards.select}>
                                <option value="all" className={allCards.option}>All</option>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </div>
                        <div className="filtroCreados">
                            <label className={allCards.labels}>Creados/existentes</label>
                            <select name="creados" id="" onChange={e => handleFilterCreated(e)} className={allCards.select}>
                                <option value="all">All</option>
                                <option value="creado">creados</option>
                                <option value="existente">existente</option>
                            </select>
                        </div>
                    </div>
                    
                    <SearchBar
                        setCurrentPage={setCurrentPage} className={allCards.searchBar}
                    />
                    
                    {/* Hago un mapeo con un ternario */}
                    <Paginado 
                        pokemonsPerPage = { pokemonsPerPage }
                        allPokemons = {allPokemons.length}
                        paginado = {paginado}
                        currentPage = {currentPage}
                    />

                    
                </div>
                <div className={allCards.containerCards}>
                    {
                        isLoading ? (
                            <div className={allCards.contLoader}>
                                
                                <span className={allCards.loader}></span>
                                
                            </div>
                        ) : (
                            currentPokemons.length ? 
                        
                        currentPokemons.map((p) => (
                            
                                <div key={p.id}>
                                
                                    <Link to={`/pokemon/${p.id}`} className={allCards.carta}>
                                        <Cards onClick={()=>dispatch(getDetail(p.id))} name={p.name} types={p.types} image={p.image} apodo={p.apodo} key={p.id}/>
                                    </Link>
                                    
                                </div>
                            
                            )): 
                    
                        <div className={allCards.contLoader}>
                            {/* <img src="https://i.gifer.com/C7qq.gif"className={allCards.loader}/> */}
                            {/* <span className={allCards.loader}></span> */}
                            <h4 className={allCards.error}>Pokemon no encontrado</h4>
                        </div>
                        )

                    }
                </div>
            </div>
        </React.Fragment>
    )
}
