import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_POKEMON = "SEARCH_POKEMON";

export function getPokemons(){
    return function(dispatch){
        axios.get("http://localhost:3001/pokemon")
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
    return async function(dispatch){
        try {
            const busqueda = await axios.get(`http://localhost:3001/pokemon?name=${name}`)
            return dispatch({
                type: SEARCH_POKEMON,
                payload: busqueda.data
            })
        } catch (error) {
            alert("Pokemon inexistente")
        }
    }
}
