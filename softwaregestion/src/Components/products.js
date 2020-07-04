import React , {useState , useEffect} from 'react'
import  {Table} from 'react-bootstrap'
import Header from './header.js'
import Trash from '../img/basura.svg'
const Products = () => {
    const [Products , setProducts] = useState([])
    const fetchData = async () => {
        const data = await fetch("http://localhost:7000/products")
        const json = await data.json()
        console.log(json)
        setProducts(json)
    }

    useEffect(() => {
        fetchData()
    } , [] )

    async function deleteProducts (name) {
        const response = await fetch(`http://localhost:7000/deleteproduct/${name}`)
        const json = await response.json()
        if(json.status === 'ok') {
            alert("Borrado correctamente")
            fetchData()
        }
        else {
            alert("Este producto tiene ventas registradas , borra primero las ventas")
        }
    }
    return (
        <>
        <Header></Header>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Articulo</th>
                    <th>PVC</th>
                    <th>PVP</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {Products.length > 0 ? 
                    Products.map(product => (
                        <tr>
                            <td>{product.nombre}</td>
                            <td>{product.pvc}</td>
                            <td>{product.pvp}</td>
                            <td><img onClick={() => deleteProducts(product.nombre)} src={Trash} style={{width:"30px" , height:"30px" , cursor:"pointer"}}></img></td>
                        </tr>
                    ))
                : ""}
            </tbody>
        </Table>
        </>
    )
}

export default Products