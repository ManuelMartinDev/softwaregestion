import React , {useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Table} from 'react-bootstrap'
import Header from './header.js'

import Trash from '../img/basura.svg'
import './search.css'
const Search = () => {
    const [values , setValues ] = useState({year:false , month:false , day:false , own:false})
    const [ventas , setVentas] = useState(false)



    const onChange = (e) => {
        const {name , value} = e.target
        setValues({
            ...values,
            [name]:value
        })

        if(values.own) {

        }
    }

    const fetchData = async () => {
        const date = {
            year:values.year,
            month:values.month,
            day:values.day
        }

        const result = await fetch("http://localhost:7000/getventas" , {
            method:'POST',
            body:JSON.stringify(date),
            headers: {
                'Content-Type':'Application/JSON'
            }
        })
        return result
    }
    const onClick = async () => {
       
      
        const result = await fetchData()
        const json = await result.json()
        setVentas(json)
        console.log(json)
    }
    const deleteSell = async id => {
        

        const response = await fetch(`http://localhost:7000/deleteventa/${id}`)
        const json = await response.json()
        if(json.status === "sucess") {
            
           const newVentas = ventas.filter(venta => venta.id !== id)
           setVentas(newVentas)
            
        }
    }

    const UpdateData = async (id , own) => {
        setValues({
            ...values,
            own:own
        })
        const response = await fetch(`http://localhost:7000/update/${id}/${own}`)
        const json2 = await response.json()

        const result = await fetchData()
        const json = await result.json()
        setVentas(json)
        
    }
   
    if(!ventas) {
          return(
        <>
        <Header></Header>
        <div className="searchbox">
            <div className="search-container">
            <div className="search">
                <input name="day" onChange={onChange} value={values.day} type="number"></input>
            </div>
            <div className="search">
                <input name="month" onChange={onChange} value={values.month} type="number"></input>
            </div>
            <div className="search">
                <input name="year" onChange={onChange} value={values.year} type="number"></input>
            </div>
            </div>
            <button onClick={onClick} className="search-button">Buscar</button>
        </div>
        </>
  
    )
    }

    else {
        return(
            <>
            <Header></Header>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Ganancia esperada</th>
                        <th>Gananancia actual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {ventas.length > 0 && ventas.map(e => e.beneficio).reduce((a , b) => a+b)}
                        </td>
                        {ventas.filter(venta => venta.pagado !== venta.vendido).length > 0 ? <td>{ventas.length > 0 &&  (ventas.map(e => e.beneficio).reduce((a , b) => a+b) - ventas.filter(venta => venta.pagado !== venta.vendido).map(e => e.vendido - e.pagado).reduce((a,b) => a+b))}</td> : ""}
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Vendido</th>
                        <th>Mercancia</th>
                        <th>Beneficio</th>
                        <th>Fecha</th>
                        <th>Pagado</th>
                        <th>Restante</th>
                        <th>Producto</th>
                        <th>Borrar</th>
                       
                    </tr>
                </thead>
                {ventas.map(venta => (
                    <tbody>
                    <tr>
                        <td>{venta.nombre_cliente}</td>
                        <td>{venta.vendido + " Unidad: " + venta.precio_unidad_vendida}</td>
                        <td>{venta.gastado}</td>
                        <td>{venta.beneficio}</td>
                        <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                        <td>{venta.pagado !== venta.vendido ? <input name="own" onBlur={(e) => UpdateData(venta.id , e.target.value )} onChange={onChange} defaultValue={venta.pagado} style={{color:"red"}}></input> : <span style={{color:'limegreen'}}>completo</span>}</td>
                        <td>{venta.pagado !== venta.vendido ? <span style={{color:'red'}}>{venta.vendido - venta.pagado}</span> : <span style={{color:'green'}}>completo</span>}</td>
                        <td>{venta.nombre_articulo}</td>
                        <td><img onClick={() => deleteSell(venta.id)} alt="" style={{width:"30px" , height:"30px" , cursor:"pointer"}} src={Trash}></img></td>
                    </tr>
                    </tbody>
                ))}
            </Table>
            </>
        )
    }
  
}

export default Search