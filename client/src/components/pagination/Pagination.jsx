import React from "react";
import pag from '../pagination/pagination.module.css';

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, currentPage}){
    const pageNumbers = [];

    // el math.ceil va a redondear para arriba el resultado de dividir la cantidad de todas las recetas por la cantidad de recetas por pagina
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        // pusheo el resultado del math.ceil
        pageNumbers.push(i + 1) // el +1 es para que renderice a partir de la pagina 1 y no desde 0
    }

    return(
        <nav className={pag.contPaginado}>
            <ul className={pag.paginado}>
                {/* primero comprobar si el arreglo pageNumber tiene algo
                en caso de que si, se le hace un map
                 */}
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return(
                            <div key={number} >
                                <button key={number} className={pag.botones} onClick={() => paginado(number)}>
                                    <span  className={pag.numeros}>{number}</span>
                                </button>
                            </div>
                            
                        )
                    })
                }
            </ul>
        </nav>
    )
}