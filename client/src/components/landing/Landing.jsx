import { React } from 'react';
import { Link } from 'react-router-dom';

// import NavBar from '../navBar/NavBar';
import landing from './landing.module.css';

export default function LandingPage(){
    return (
        // <React.Fragment>
            <div className={landing.container}>
                <h1 className={landing.titulo}>BIENVENIDOS</h1>
                {/* <NavBar/> */}
                <Link to = '/home'>
                    <button className={landing.boton}> 
                        <span className={landing.ingresar}>Ingresar</span>
                     
                    </button>
                </Link>
            </div>
        // </React.Fragment>
    )
}