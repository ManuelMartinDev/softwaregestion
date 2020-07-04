import React , {useEffect , useState} from 'react'
import DropItem from './drop'
import './droplist.css'
const DropList = (props) => {
   const [Names , setNames] = useState([])
    useEffect(() => {
        async function getNames() {
            const names = await fetch("http://localhost:7000/names")
            const json = await names.json()
            setNames(json)
        }
        getNames()
    } , [])
    return (
        <div className="down">
        {!props.query && Names.map(e => <DropItem key={e.nombre} setclient={props.setclient} name={e.nombre}></DropItem>)}
        {props.query && Names.filter( e => e.nombre.toLowerCase().includes(props.query.toLowerCase())).map(name => <DropItem setclient={props.setclient} key={name.nombre} name={name.nombre}></DropItem>)}
        </div>
    )
}

export default DropList