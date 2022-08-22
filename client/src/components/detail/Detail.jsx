import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../actions/index";

import detail from "../detail/detail.module.css"
import { Link } from "react-router-dom";

export default function Detail(){
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.detail);
    console.log(myPokemon, "poke");
    
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    }, [])

    

    return(
        <div>
            <div>hola</div>
            
        </div>
    )

    // if (Object.keys(myPokemon).length === 0) {
    //     console.log(myPokemon.types);
    
    //     return (
    //       <div>
    //         <h2>No hay nada</h2>
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div className="paginado2">
    //         <div>
    //           <Link to="/home">
    //             <button className="botonDetails">
    //               Home
    //             </button>
    //           </Link>
    //         </div>
    //         <div>
    //           <img
    //             className="imagdetalle"
    //             src={myPokemon.imgage }
    //             alt={myPokemon.name}
    //             width="450px"
    //             height="450px"
    //           />
    //         </div>
    
    //         <div className="cardDetalle">
    //           <div>
    //             <h1>{myPokemon.name.toUpperCase()}</h1>
    //           </div>
             
                
    //         </div>
    //       </div>
    //     );
    //   }
   
   
   
//     const [count, setCount] = useState(0)

//   useEffect(() => {
//     // Actualiza el title de la página en cada click!
//     document.title = `Has hecho clic ${count} veces`
//   })

//   return (
//     <div>
//       <span>El contador está a {count}</span> 
//       <button onClick={() => setCount(count + 1)}>
//         Incrementar contador
//       </button>
//     </div>
//   )
}
    

    