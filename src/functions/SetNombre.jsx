import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import '../style/styles.css';

function SetNOMBRE() {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const selectedBranch = localStorage.getItem('selectedBranch');
        if (!selectedBranch) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const savedNombre = localStorage.getItem('nombre');
        if (savedNombre) {
            setNombre(savedNombre);
        }
    }, []);

    async function handleNext() {
        if (!nombre) {
            setError('Por favor, ingrese su nombre.');
            return;
        }

        try {
            localStorage.setItem('nombre', nombre);
            navigate('/paso3');
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un error al procesar tu solicitud.');
        }
    }

    function handlePrevious() {
        navigate('/paso1');
    }

    return (
        <div className="wrapper">
            <div className="header-container">
                <IoIosArrowBack
                    className="back-arrow"
                    onClick={() => {
                        handlePrevious();
                        localStorage.removeItem('dni');
                    }}
                />
                <h2>Solicitar Turno</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="policy">
                    <h3>No encontramos tu DNI/CUIT en el sistema. Ingresa tu nombre </h3>
                </div>
                <div className="policy">
                    <h3>DNI/CUIT: {localStorage.getItem('dni')}</h3>
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        className='form-control'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
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

export default SetNOMBRE;
