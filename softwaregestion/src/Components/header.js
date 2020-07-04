import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => (
    <div style={{marginBottom:'1.2em' , width:'100%'}}>
    <header>
        <ul style={{width:'100%'}}>
            <Link to="/"><span style={{fontSize:'1.3em'}}>Volver atrás</span></Link>
        </ul>
    </header>
    <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center'}} className="bg">
        <h5 style={{color:"white"}}>Software de Gestión creado por Manuel Martín Fernández</h5>
    </div>
    </div>
)

export default Header


