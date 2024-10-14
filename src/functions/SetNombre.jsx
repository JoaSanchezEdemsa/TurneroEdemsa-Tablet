import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css'; // Asegúrate de que este archivo incluya el nuevo estilo

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

    async function handleNext() {
        if (!nombre) {
            setError('Por favor, ingrese su nombre.');
            return;
        }

        try {
            localStorage.setItem('nombre', nombre);
            navigate('/paso3'); // Navegar a la siguiente página
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un error al procesar tu solicitud.');
        }
    }

    function handlePrevious() {
        navigate('/paso1'); // Navegar a la página anterior
    }

    return (
        <div className="wrapper">
            <h2>Turnos</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <div className="policy">
                    <h3>Edemsa 2024</h3>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="button-container">
                    <button type="button" onClick={handlePrevious} className="nav-button">
                        ◀ Anterior 
                    </button>
                    <button type="button" onClick={handleNext} className="nav-button">
                        Siguiente ▶ 
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SetNOMBRE;
