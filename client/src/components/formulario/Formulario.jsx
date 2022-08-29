import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import { createPokemon, getPokemons, getTypes } from '../../actions';

import NavBar from '../navBar/NavBar';
import form from '../formulario/formulario.module.css';

function validacion(input){
    let error = {};
    const regexName = /^[a-zA-Z ]+$/;

    const selectUndefined = (input)=> {
        //comprueba que todos los campos esten llenos
        for(let i in input ){
            if(input[i] === undefined){
                return true;
            } else{
                return false;
            }
        }
    }

    if(selectUndefined(input)){
        error.allFields = "Todos los campos son obligatorios"
    }
    if(!input.name ){
        error.name = "El campo nombre es obligatorio"
    } else if(!regexName.test(input.name)){
        error.name = "No se aceptan numeros"
    }
    if(!input.hp){
        error.hp = "Este campo es obligatorio";
    } else if(input.hp <= 0 || input.hp > 100){
        error.hp = "Debe ser mayor a 0 y menor a 100"
    }
    if(!input.attack){
        error.attack = "Este campo es obligatorio";
    } else if(input.attack <= 0 || input.attack > 100){
        error.attack = "Debe ser mayor a 0 y menor a 100"
    }
    if(!input.defense){
        error.defense = "Este campo es obligatorio";
    } else if(input.defense <= 0 || input.defense > 100){
        error.defense = "Debe ser mayor a 0 y menor a 100"
    }
    if(!input.speed){
        error.speed = "Este campo es obligatorio";
    } else if(input.speed <= 0 || input.speed > 100){
        error.speed = "Debe ser mayor a 0 y menor a 100"
    }
    if(!input.height){
        error.height = "Este campo es obligatorio";
    } else if(input.height <= 0 || input.height > 100){
        error.height = "Debe ser mayor a 0 y menor a 100"
    }
    if(!input.weight){
        error.weight = "Este campo es obligatorio";
    } else if(input.weight <= 0 || input.weight > 100){
        error.weight = "Debe ser mayor a 0 y menor a 100"
    }
     
    // el test sirve para comprobar que haya un escritura dentro del input
    // if(input.image && !url.test(input.image)){
    //     error.url = "Imagen no valida"
    // }

    return error;
}

export default function Formulario(){

    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    const tipos = useSelector((state) => state.types);
    const navigate = useNavigate();

    const [ input, setInput ] = useState({
        name: "", 
        hp: "", 
        attack: "", 
        defense: "",
        speed: "",
        height: "", 
        weight: "", 
        image: "", 
        types: []
    })
    // genero un estado para validación
    const [ error, setError] = useState({
        allFields: "Todos los campos son obligatorios"
    });

    useEffect(() =>{
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch])


    function handleChange(e){
        // va guardando todo lo que el usuario escribe, en el estado input
        setInput({
            //trae todo lo que ya tenia
            ...input,
            // setea el e.target.name en e.target.value
            // este name hace referencia al tag input
            [e.target.name] : e.target.value

        })
        setError(validacion({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
        
        console.log(e.target.value)
    }

    function handleSelect(e){
        if(input.types.includes(e.target.value)){
           return alert("El tipo ya existe") 
        }
        if(input.types.length >= 2){
            return alert("No aceptan mas tipos")
        }
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        const namePoke = pokemons.filter((e)=>e.name === input.name)
        if(namePoke.length){
            e.preventDefault()
            return alert("El nombre del pokemon ya existe")
        } else {
        e.preventDefault();
        console.log(input, "1")
        

        // despacho la acción
        dispatch(createPokemon(input))
        console.log(dispatch)

        alert('Pokemon creada')
        // vacio mi estado
        setInput({
            name: "", 
            hp: "", 
            attack: "", 
            defense: "",
            speed: "",
            height: "", 
            weight: "", 
            image: "", 
            types: []
        })
        
        // redirecciona al home
        navigate("/home")
        // }
        }
    }
    
    return(
        <div className={form.contenedor}>
            <NavBar/>
            <Link to='/home'>
                <button className={form.volver}><img src="https://static4.depositphotos.com/1000335/354/i/600/depositphotos_3543164-stock-photo-arrow-left-icon-blue-isolated.jpg" alt="" /></button>
            </Link>

            <h1 className={form.titulo}>Crea tu pokemon</h1>

            <form onSubmit={(e) => handleSubmit(e)} className={form.formulario}>
                <div className={form.labels}>
                    <div className={form.contLabels}>
                        <label>Nombre:</label>
                        <input type="text"
                        value={input.name} 
                        name="name"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.name && (<p className={form.error}>{error.name}</p>)}</span>
                    </div>

                    <div className={form.contLabels}>
                        <label>Vida:</label>
                        <input type="number" 
                        value={input.hp} 
                        name="hp"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.hp && (<p className={form.error}>{error.hp}</p>)}</span>
                    </div>
                    
                    <div className={form.contLabels}>
                        <label>Ataque:</label>
                        <input type="number" 
                        value={input.attack} 
                        name="attack"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.attack && (<p className={form.error}>{error.attack}</p>)}</span>
                    </div>
            
                    <div className={form.contLabels}>
                        <label>Defensa:</label>
                        <input type="number" 
                        value={input.defense} 
                        name="defense"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.defense && (<p className={form.error}>{error.defense}</p>)}</span>
                    </div>
                    
                    <div className={form.contLabels}>
                        <label>Velocidad:</label>
                        <input type="number" 
                        value={input.speed} 
                        name="speed"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.speed && (<p className={form.error}>{error.speed}</p>)}</span>
                    </div>
                    
                    <div className={form.contLabels}>
                        <label>Altura:</label>
                        <input type="number" 
                        value={input.height} 
                        name="height"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.height && (<p className={form.error}>{error.height}</p>)}</span>
                    </div>
                    
                    <div className={form.contLabels}>
                        <label>Peso:</label>
                        <input type="number" 
                        value={input.weight} 
                        name="weight"
                        onChange={(e)=>handleChange(e)}/>
                        <span className={form.validacion}>{error.weight && (<p className={form.error}>{error.weight}</p>)}</span>
                    </div>
                    
                    <div className={form.contLabels}>
                        <label>Imagen:</label>
                        <input type="text"
                        value={input.image} 
                        name="image"
                        onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <br />
                </div>
                <label>Tipo/s:</label>
                <select onChange={(e)=>handleSelect(e)}>
                    <option value="all">Todos</option>
                    {
                        tipos.map((e)=>
                            (
                                <option value={e.name} key={e.name}>
                                    {e.name}
                                </option>
                            )
                        )
                    }
                </select>
                <ul className={form.selector}>
                    <li>{input.types.map((e) => e + " ")}</li>
                </ul>
                
                {
                        Object.keys(error).length ? (
                <button type='submit'  disabled={true} className={form.crear}>Crear</button>
                ) :
                (
                    <button type='submit'  className={form.crear}>Crear</button>
                )
            }
            </form>
        </div>
    )

}