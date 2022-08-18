import React from "react";
import cards from '../cards/cards.module.css';




export default function Card({ name, types, image }){
    return (
        <div className={cards.container}>
            <h1>{name}</h1>
            <h4>{types}</h4>
            <img src={image} alt="not found" className={cards.img}/>

        </div>
    )
}
