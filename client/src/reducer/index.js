import { 
    CLEAR, 
    CREATE_POKEMON, 
    FILTER_BY_ATTACK, 
    FILTER_BY_TYPES, 
    FILTER_CREATED, 
    GET_DETAILS,
    GET_LOADING, 
    GET_POKEMONS, 
    GET_TYPES, 
    ORDER_BY_NAME, 
    SEARCH_POKEMON, 
} from "../actions"

const initialState = {
    pokemons: [],
    copyPokemons: [],
    types: [],
    details: {},
    isLoading: true
}



export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                copyPokemons: action.payload,
                // cada vez que carga los pokemons se cambia a false
                isLoading: false
            }
        case SEARCH_POKEMON:
            let filterNombre = action.payload === "" ? state.copyPokemons : state.copyPokemons.filter((poke) => poke.name.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,
                pokemons: filterNombre,
                isLoading: false
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
        case FILTER_BY_ATTACK:
            const sortAttack = action.payload === 'asc' ? state.pokemons.sort(function(a, b) {
                if(a.attack > b.attack) return 1; // si el nombre de a es menor que el de b, a va antes que b
                if(b.attack > a.attack) return -1; // si el nombre de a es mayor que el de b, a va despues que b
                return 0;
            }) : state.pokemons.sort(function(a, b){
                if(a.attack > b.attack) return -1; // si el nombre de a es menor que el de b, a va antes que b
                if(b.attack > a.attack) return 1; // si el nombre de a es mayor que el de b, a va despues que b
                return 0;
            })
            console.log(sortAttack, "ataque")
            return{
                ...state,
                pokemons: action.payload === 'all' ? state.copyPokemons: sortAttack
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
                    details: action.payload,
                    isLoading: false
            }
        case CLEAR:
            return{
                ...state,
                details: action.payload
            }
        case CREATE_POKEMON:
            return{
                ...state
            }
        case GET_LOADING:
            return{
                ...state,
                isLoading: true
            }
        default:
            return{...state}
    }
}