import React from "react";
import n from './navBar.module.css'

const NavBar = () => {
    return(
        <nav className={n.contenedor}>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" height="100px" className={n.logo} alt="img not found" />
            </div>
            
            
        </nav>
    )
}

export default NavBar;