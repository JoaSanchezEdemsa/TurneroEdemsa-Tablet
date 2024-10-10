import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

function SetMotivos() {
    const [motivo, setMotivo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedMotivo = localStorage.getItem('motivo');
        if (savedMotivo) {
            setMotivo(savedMotivo);
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            localStorage.setItem('motivo', motivo);

            const res = await axios.post('http://turnero:8080/getmotivobysucursal', { motivo });









        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un error al procesar tu solicitud.');
        }
    }

    return (
        <div className="wrapper">
            <h2>Turnos</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input type="text" 
                    placeholder="Ingrese su nombre" 
                    className='form-control'
                    value={motivo}
                    onChange={e => setMotivo(e.target.value)}
                    required />
                </div>
                <div className="policy">
                    <h3>Edemsa 2024</h3>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="input-box button">
                    <input type="Submit" value="Enviar" />
                </div>
            </form>
        </div>
    );
}

export default SetMotivos;