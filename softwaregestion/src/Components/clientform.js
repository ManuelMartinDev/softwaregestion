import React , {useState , useEffect} from 'react'
import './clientform.css'
import  {Table} from 'react-bootstrap'
import Header from './header.js'
const ClientForm = () => {
    const [clientName , setClientName] = useState(false)
    const [actualClients , setActualClients] = useState([])
    const updateName = e => {
        setClientName(e.target.value)
    } 
    
    const senData = async () => {
        if(!clientName || clientName.length === 0) {
            alert("El campo de cliente está vacio")
            return 
        }
        if(actualClients.filter(client => client.nombre === clientName).length > 0) {
            alert("Este cliente ya existe")
            return
        }
        const client = {
            nombre: clientName.trim().replace(/ +(?= )/g,'')
        }
        const response = await fetch("http://localhost:7000/newclient" , {
            method:'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type':'Application/JSON'
            }
        })
        const json = await response.json()

        if(json.status === "ok") {
            alert("Cliente creado")
            getClientsNames()
        }
    }

    async function getClientsNames() {
        const response =  await fetch("http://localhost:7000/names")
        const json = await response.json()
       setActualClients(json)
     }

    useEffect(() => {
       

        getClientsNames()
    } , [])

    return (
        <div className="client-form-container">
            <Header></Header>
            <form>
                <p>Introduce el nombre del cliente</p>
                <div className="input-box-client">
                    <input onChange={updateName} value={clientName ? clientName : ""} placeholder="Escribir aquí"></input>
                    
                </div>
                <div onClick={senData} className="search-button">Enviar</div>
            </form>
           <Table>
               <thead>
                   <tr>
                       <th>Nombre de cliente</th>
                   </tr>
               </thead>
               <tbody>
                 {actualClients ? actualClients.map(client => <tr><td>{client.nombre}</td></tr>) : ""}
               </tbody>
           </Table>
        </div>
        
    )
}

export default ClientForm