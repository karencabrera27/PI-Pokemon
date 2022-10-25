import React from "react";
import cards from '../cards/cards.module.css';



export default function Card({ name, types, image, apodo }){
    // const tipes = !types ? ["N/A"] : types.split(",");
    console.log(apodo, "apodo")
    return (
        <>
            {
                types ? (
                    <div className={cards.container}>
                        <h1 className={cards.titulo}>{name}</h1>
                        
                        <div>
                            {
                                types.map((e, i)=>{
                                    return(
                                        <span key={i} className={cards.tipos}>
                                            {e} 
                                        </span>
                                    )
                                }) 
                            }
                        </div>
                        <img src={image} alt="not found" className={cards.img}/>
                            <h4>{apodo}</h4>
                    </div>
                    ) : (
                        <h1 className={cards.error}>No existe un pokemon con ese tipo</h1>
                    )
            }
        </>
    )
}
