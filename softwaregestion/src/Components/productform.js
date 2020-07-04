import React , {useState} from 'react'
import  {Form , InputGroup , Button , FormControl , Col} from 'react-bootstrap'
import Header from './header.js'
const ProductForm = () => {
    const [ProductValues , setProducValues] = useState({name:false , pvc:false , pvp:false})

    const updateProducts = e => {
        const {name , value} = e.target
        setProducValues({
            ...ProductValues,
            [name]:value
        })
    }

    const CreateProduct = async e => {
        e.preventDefault()
        if(!ProductValues.name || !ProductValues.pvc || !ProductValues.pvp) {
            alert("Todos los campos deben estar rellenos")
        } else {
            const product = {
                name:ProductValues.name.trim(),
                pvc : ProductValues.pvc,
                pvp: ProductValues.pvp
            }
            const response = await fetch("http://localhost:7000/product" , {
                method:'POST',
                body:JSON.stringify(product),
                headers: {
                    'Content-Type':'Application/JSON'
                }
            })
            const json = response.json()

            if(json.status = 'sucess') {
                alert("Producto creado")
            } else {
                alert("Hubo un error intentalo de nuevo")
            }
        }
    }

    return (
        <div style={{display:'flex' , flexDirection:'column' , alignItems:"center"}}>
                <Header></Header>
                <Form style={{minWidth:'410px' , width:'70%'}} variant="dark">


  <Form.Group controlId="formGridAddress1">
    <Form.Label>Nombre del producto</Form.Label>
    <Form.Control value={ProductValues.name ? ProductValues.name : ""} onChange={updateProducts} name="name" placeholder="Escribir aquí" />
  </Form.Group>



  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>PVC</Form.Label>
      <Form.Control step={0.01} type="number" value={ProductValues.pvc} onChange={updateProducts} name="pvc" />
    </Form.Group>

    
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>PVP</Form.Label>
      <Form.Control step={0.01} type="number" value={ProductValues.pvp} onChange={updateProducts} name="pvp" />
    </Form.Group>

  </Form.Row>

  <Button onClick={CreateProduct} variant="primary" type="submit">
    Crear
  </Button>
</Form>
        </div>
    )
}

export default ProductForm