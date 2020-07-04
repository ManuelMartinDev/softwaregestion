import React , {useState , useEffect}  from 'react'
import DropList from './droplist'
import './sellform.css'
import Header from './header.js'
import  {Form , Col} from 'react-bootstrap'
import copiar from '../img/copiar.svg'

const Sellform = () => {
    const [Data , setData] = useState({nombre:"" , vendido:false , fecha:false , pagado:false , articulo:false , cantidad:false})
    const [Errors , setErrors] = useState({nombre:"" , vendido:false , fecha:false , articulo:false})
    const [Client , setClient] = useState(false)
    const [articles , setArticles] = useState([])

    const onChange = (e) => {
 
        const {name , value} = e.target
        const NewData = {
            ...Data,
            [name]:value
        }
        setData(NewData)

    }


const cloneInfo = () => {
    setData({
        ...Data,
        pagado: Data.vendido * Data.cantidad
    })
}


const setNewClient = name => {
    setData({...Data , nombre:name})
    setClient(name)
}

const onBlur = () => {
    setErrors({nombre:"" , mercancia:false , vendido:false , fecha:false , articulo:false})
    const validatedErrors = {nombre:"" , mercancia:false , vendido:false , fecha:false , articulo:false}
          
        
    if(Data.nombre.length === 0) {
        validatedErrors.nombre = "yes"
        setErrors(validatedErrors)
    }

    if(!Data.mercancia) {
        validatedErrors.mercancia = "yes"
        setErrors(validatedErrors)
    }

    if(!Data.vendido) {
        validatedErrors.vendido = "yes"
        setErrors(validatedErrors)
    }

    if(!Data.fecha) {
        validatedErrors.fecha = "yes"
        setErrors(validatedErrors)
    }

  
}   
    const sendData = async () => {
        if(Data.nombre && Data.vendido && Data.fecha && Data.articulo && Data.cantidad > 0) {
            
           
            if(Client !== Data.nombre) {
                alert("Cliente no existente")
                return
            }
            const venta = {
                vendido:Data.vendido,
                gastado:articles.filter(article => article.nombre === Data.articulo)[0].pvp,
                nombre_cliente : Data.nombre,
                fecha : Data.fecha,
                pagado:Data.pagado,
                articulo:Data.articulo,
                cantidad:Data.cantidad
            }
           
           const response = await  fetch("http://localhost:7000/venta" , {
                method:'POST',
                body:JSON.stringify(venta) ,
                headers: {
                    'Content-Type':'Application/JSON'
                }
            })
            
            const json = await response.json()
            console.log(json.status)
            if(json.status === 'sucess') {
                alert("Enviado")
            }
            console.log(venta)
            console.log(articles)
        } else {
            alert("no se pueden dejar campos vacios")
            console.log(Errors)
        }
        
    }


  

    useEffect(() => {
        async function fetchMyData() {
            const data = await fetch("http://localhost:7000/products")
            const json = await data.json()
            console.log(json)
            json.forEach(article =>  {
                article.nombre = article.nombre.replace(/ +(?= )/g,'')
            })
            setArticles(json)
           
        }

        fetchMyData()
    } , [])

    return (
        <>
        <Header></Header>
        <div className="form-container">
           <form autoComplete="off">
               <h2>Crear venta</h2>
                {Errors.nombre ? <p>Cliente no puede estar vacio</p> : ""}
                {Errors.mercancia ? <p>Mercancia no puede estar vacio</p> : ""}
                {Errors.vendido ? <p>Vendido no puede estar vacio</p> : ""}
                
               <div className="input-container drop">
                   <p>Nombre del cliente</p>
                   <div className="input-box">
                       <input type="search"  onChange={onChange} value={Data.nombre} name="nombre"></input>
                   </div>
                   <DropList setclient={setNewClient} query={Data.nombre}></DropList>
                  
               </div>
               <Form.Group className="mt-5" as={Col} controlId="formGridState">
                <Form.Label>Articulo</Form.Label>
                    <Form.Control as="select"  defaultValue="Choose..." name="articulo"  onChange={onChange}>
                        <option>{""}</option>
                        {articles.length > 0 ?
                            articles.map((article , index) => <option key={index}>{article.nombre}</option>)
                            : ""
                        }
                    </Form.Control>
                </Form.Group>
               <div className="input-container multi">
                 <div className="box">
                    <p>Venta/Unidad</p>
                   <div className="input-box">
                       <input onBlur={onBlur} onChange={onChange} value={Data.vendido} name="vendido" type="number"></input>
                   </div>
                 </div>
                 
                 <div className="box">
                    <p>Pagado</p>
                   <div className="input-box">
                       <input onBlur={onBlur} onChange={onChange} value={Data.pagado } name="pagado" type="number"></input>
                    
                   </div>
                   
                 </div>
                 <div className="box">
                    <p>Nº Articulos</p>
                   <div className="input-box">
                       <input  min={1} onBlur={onBlur} onChange={onChange} value={Data.cantidad} name="cantidad" type="number"></input>
                   </div>
                   
                 </div>
                <img onClick={cloneInfo} style={{width:"50px" , height:"50px" , cursor:'pointer'}} src={copiar}></img>
               </div>
              
               <input onBlur={onBlur} value={Data.fecha} className="date" name="fecha" onChange={onChange} type="date"></input>
        
               
               <div onClick={sendData} className="button">
                   <span>Registrar</span>
               </div>
           </form>
        </div>
        </>
    )
}

export default Sellform