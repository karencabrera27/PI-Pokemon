import { FILTER_BY_TYPES, FILTER_CREATED, GET_DETAILS, GET_POKEMONS, GET_TYPES, ORDER_BY_NAME, SEARCH_POKEMON } from "../actions"

const initialState = {
    pokemons: [],
    copyPokemons: [],
    types: [],
    details: {}
}



export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                copyPokemons: action.payload
            }
        case SEARCH_POKEMON:
            return{
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:

            return{
                ...state,
                types: action.payload
            }
        case ORDER_BY_NAME:
            const sortArr = action.payload === 'asc' ? state.pokemons.sort(function(a, b){
                // a.name = recipes.names
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                // en el caso que sean iguales los deja como están 
                return 0
                }) :
                state.pokemons.sort(function(a, b){
                    // a.name = recipes.names
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    // en el caso que sean iguales los deja como están 
                    return 0
                })
    
                return{
                    ...state,
                    pokemons: sortArr
                }
            
            case FILTER_CREATED:
                const allpokemons = state.copyPokemons
                const createdFilter = action.payload === 'creado' ? allpokemons.filter( e => e.createdInDb) : allpokemons.filter(e => !e.createdInDb)
        
                return{
                    ...state,
                    pokemons: action.payload === 'all' ? state.copyPokemons : createdFilter
                }
            case FILTER_BY_TYPES:
                const allPokemons = state.copyPokemons;
                const typeFilter = action.payload === "all" ? allPokemons : allPokemons.filter(e => e.types.includes(action.payload)) 
                console.log(typeFilter, 'soy el filtro')
                return{
                    ...state,
                    pokemons: typeFilter.length ? typeFilter : [`${action.payload} POKEMON`]
                }
            case GET_DETAILS: 
                return{
                    ...state,
                    details: action.payload
                }
        default:
            return{...state}
    }
}