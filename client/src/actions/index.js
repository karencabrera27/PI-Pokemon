import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS"

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