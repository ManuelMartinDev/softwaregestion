import React  from 'react'
import './home.css'
import {Link} from 'react-router-dom'

const Home = () => {

 return(
    <div className="home-container">
        <div className="option-box">
        <h2>Crear una venta</h2>
        <div className="bg-box bg-1">
            <Link to={'/sellform'} className="link"></Link>
        </div>
       </div>

       <div className="option-box">
        <h2>Ver mis ventas</h2>
        <div className="bg-box bg-2">
            <Link to={'/search'} className="link"></Link>
        </div>
       </div>

       <div className="option-box">
        <h2>Añadir un cliente</h2>
        <div className="bg-box bg-3">
            <Link to={'/addclient'} className="link"></Link>
        </div>
        </div>

        <div className="option-box">
        <h2>Facturas Impagadas</h2>
        <div className="bg-box bg-4">
            <Link to={'/unpaid'} className="link"></Link>
        </div>
        </div>

        <div className="option-box">
        <h2>Crear Producto</h2>
        <div className="bg-box bg-5">
            <Link to={'/productform'} className="link"></Link>
        </div>
        </div>

        <div className="option-box">
        <h2>Ver mis productos</h2>
        <div className="bg-box bg-6">
            <Link to={'/products'} className="link"></Link>
        </div>
        </div>

        <div className="option-box">
        <h2>Registar gastos diarios</h2>
        <div className="bg-box bg-7">
            <Link to={'/spentform'} className="link"></Link>
        </div>
        </div>
    
    </div>
    )

    

   
}

export default Home