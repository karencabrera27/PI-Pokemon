import React from "react";
import cards from '../cards/cards.module.css';



export default function Card({ name, types, image }){
    // const tipes = !types ? ["N/A"] : types.split(",");
    return (
        <div className={cards.container}>
            <h1 className={cards.titulo}>{name}</h1>
            {/* <h4 >{types}</h4> */}
            <div>
                {
                    types ? types.map((e, i)=>{
                        return(
                            <span key={i} className={cards.tipos}>
                                {e} 
                             </span>
                        )
                    }) : <h4>N/A</h4>
                }
            </div>
            <img src={image} alt="not found" className={cards.img}/>

        </div>
    )
}
