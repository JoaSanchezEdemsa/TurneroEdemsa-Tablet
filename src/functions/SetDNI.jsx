import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import '../style/styles.css';

function SetDNI() {
    const [dni, setDni] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const selectedBranch = localStorage.getItem('selectedBranch');
        if (!selectedBranch) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const savedDni = localStorage.getItem('dni');
        if (savedDni) {
            setDni(savedDni);
        }
    }, []);

    async function handleNext() {
        if (!dni) {
            setError('Por favor, ingrese su DNI.');
            return;
        }
        try {
            localStorage.setItem('dni', dni);
            const res = await axios.post('http://turnero:8080/getclientes', { dni });
            console.log(res.data);
            if (res.data.usuarioExiste) {
                localStorage.setItem('nombre', res.data.cliente.CLIENTE);
                navigate('/paso3');
            } else {
                navigate('/paso2');
            }
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un error al procesar tu solicitud.');
        }
    }

    return (
        <div className="wrapper">
            <h2>Solicitar Turno</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-box">
                    <input
                        type="number"
                        placeholder="Ingrese su DNI/QUIL"
                        className='form-control'
                        value={dni}
                        onChange={e => setDni(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="button-container">
                    <button type="button" onClick={handleNext} className="nav-button">
                        Siguiente
                        <IoIosArrowForward className="next-arrow" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SetDNI;
