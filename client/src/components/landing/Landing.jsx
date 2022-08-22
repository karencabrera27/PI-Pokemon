import { React } from 'react';
import { Link } from 'react-router-dom';

// import NavBar from '../navBar/NavBar';

export default function LandingPage(){
    return (
        // <React.Fragment>
            <div>
                <h1> BIENVENIDOS A LA POKEMON APP </h1>
                {/* <NavBar/> */}
                <Link to = '/home'>
                    <button> 
                        <span>Ingresar</span>
                     
                    </button>
                </Link>
            </div>
        // </React.Fragment>
    )
}