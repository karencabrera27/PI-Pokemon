import React from 'react';
import NavBar from '../navBar/NavBar';
import AllCards from '../cards/AllCards';

import home from '../home/home.module.css';

export default function Home(){
    
    return(
        <React.Fragment>
            <NavBar/>
            
            <div className={home.containerCards}>
                <AllCards/>
            </div>
        </React.Fragment>
        
    )
}