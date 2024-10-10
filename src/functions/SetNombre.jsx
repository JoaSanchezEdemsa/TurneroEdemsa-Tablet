import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

function SetNOMBRE() {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedNombre = localStorage.getItem('nombre');
        if (savedNombre) {
            setNombre(savedNombre);
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            localStorage.setItem('nombre', nombre);

            if (nombre != null){
                navigate('/paso3');
            } else {
                console.log('Error')
            }
            
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
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
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

export default SetNOMBRE;