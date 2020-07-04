import React from 'react'
import './drop.css'
const DropItem = (props) => {
    return (
    <div onClick={() => props.setclient(props.name)} className="drop-item">{props.name}</div>
    )
}

export default DropItem