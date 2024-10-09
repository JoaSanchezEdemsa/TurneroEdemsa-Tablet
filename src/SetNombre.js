import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function SetNombre() {
    const [cliente, setCliente] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/paso3', {cliente})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='text'>Cliente</label>
                        <input type='text' placeholder='Ingrese su nombre' className='form-control'
                        onChange={(e) => setCliente(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default SetNombre;