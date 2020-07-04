import React from 'react'
import  {Form , Col} from 'react-bootstrap'
const SpentForm = () => {
    return (
        <div style={{display:'flex' , marginTop:'20px'}}>
           
                <div style={{width:'20%'}}>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control style={{width:'50%'}} />
                </div>
            <input type="date"></input>
        </div>
    )
}


export default SpentForm