import { GET_POKEMONS, SEARCH_POKEMON } from "../actions"

const initialState = {
    pokemons: []
}



export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload
            }
        case SEARCH_POKEMON:
            return{
                ...state,
                pokemons: action.payload
            }
        default:
            return{...state}
    }
}