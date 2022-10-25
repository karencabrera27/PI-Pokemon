import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR = "CLEAR";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_LOADING = "GET_LOADING";

export function getPokemons(){
    return function(dispatch){
        axios.get(`/pokemon`)
            .then(pokemons => {
                dispatch({
                    type: GET_POKEMONS,
                    payload: pokemons.data
                })
            })
            .catch(error => console.log(error))
        }
}

export function getPokemonName(name){
        console.log(name, "payload")
        try {
            
            return ({
                type: SEARCH_POKEMON,
                payload: name
            })
        } catch (error) {
            alert("Pokemon inexistente")
        }
}

export default function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function getTypes(){
    return async function(dispatch){
        const tipos = await axios.get(`/types`)
            // console.log(tipos.data, "data")
            console.log(tipos, "soylos tipos")
            return dispatch({
                type: GET_TYPES,
                payload: tipos.data
                
            })
            
    }
}

// Filtro por tipos

export function filterPokemonsByTypes(payload){
    console.log(payload)
    return{
        type:FILTER_BY_TYPES,
        payload
    }
}

//filtro por ataque
export function filterByAttack(payload){
    console.log(payload, "ataque")
    return{
        type: FILTER_BY_ATTACK,
        payload
    }
}

// filtro creados-existentes
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

// detalle
export function getDetail(id){
    return async function(dispatch){
        console.log(getDetail, "action")
        try {
            const detalle = await axios.get(`/pokemon/` + id)
            console.log(detalle.data, "data")
            return dispatch({
                type: GET_DETAILS,
                payload: detalle.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// limpiar detalle
export function Clear(){
    return {
        type: CLEAR,
        payload: []
    }
}

export function createPokemon(payload){
    return async function(){
        const post = await axios.post('/pokemon', payload)
        console.log(post)
        return post
    }
}

export function ActiveLoading(){
    return function(dispatch){
        return dispatch({
            type: GET_LOADING

        })
    }
}