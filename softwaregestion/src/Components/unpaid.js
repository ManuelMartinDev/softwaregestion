import React , {useState , useEffect} from 'react'
import  {Table} from 'react-bootstrap'
import Trash from '../img/basura.svg'
import Header from './header.js'
const Unpaid = () => {
    const [unpaid , setUnpaid] = useState([])
    const [values , setValues] = useState({own:false})
    async function fetchData() {
        const response = await fetch("http://localhost:7000/unpaid")
        const json = await response.json()
        console.log(json)
        setUnpaid(json)
    }
    const onClick = async () => {
       
      
        const result = await fetchData()
        const json = await result.json()
        setUnpaid(json)
        console.log(json)
    }
    const deleteSell = async id => {
        

        const response = await fetch(`http://localhost:7000/deleteventa/${id}`)
        const json = await response.json()
        if(json.status === "sucess") {
            
           const newVentas = unpaid.filter(venta => venta.id !== id)
           setUnpaid(newVentas)
            
        }
    }

    const onChange = (e) => {
        setValues({own:e.target.value})
    }
    const UpdateData = async (id , own) => {
        setValues({

            own:own
        })
        const response = await fetch(`http://localhost:7000/update/${id}/${own}`)
        fetchData()
        
    }

    


    useEffect(() => {
        fetchData()
    },[])
    
    if(unpaid.length === 0) {
        return "a"
    } else {
        return(
            <>
            <Header></Header>
            <h1 style={{textAlign:"center"}}>Facturas pendientes de pago</h1>
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
                        {unpaid.length > 0 && unpaid.map(e => e.beneficio).reduce((a , b) => a+b)}
                        </td>
                        {unpaid.map(venta => venta.pagado).reduce((a,b) => a+b)}
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
                        <th></th>
                        <th>Borrar</th>
                       
                    </tr>
                </thead>
                <tbody>
                {unpaid.map(venta => (
                    
                    <tr key={venta.id}>
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
                    
                ))}
                </tbody>
            </Table>
            </>
        )
    }
}

export default Unpaid