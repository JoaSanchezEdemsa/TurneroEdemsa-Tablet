import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // para redirigir a otra página

function SetDNI() {
    const [dni, setDni] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await axios.post('http://turnero:8080/getclientes', { dni });
            console.log(res.data);

            // Si el usuario existe
            if (res.data.usuarioExiste) {
                navigate('/paso3'); // Redirigir a la página '/paso3'
            } else {
                navigate('/paso2'); // Redirigir a la página '/paso2'
            }
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un error al procesar tu solicitud.');
        }
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='number'>DNI</label>
                        <input
                            type='number'
                            placeholder='Ingrese su DNI'
                            className='form-control'
                            value={dni}
                            onChange={e => setDni(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>} {/* Mostrar errores si los hay */}
                    <button className='btn btn-success'>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default SetDNI;
