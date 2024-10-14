import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

function SelectReason() {
    const [reasons, setReasons] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const selectedBranch = localStorage.getItem('selectedBranch');

    useEffect(() => {
        if (!selectedBranch) {
            navigate('/');
            return;
        }

        async function fetchReasons() {
            try {
                const response = await axios.get(`http://turnero:8080/getmotivos`, {
                    params: { COD_UNICOM: selectedBranch }
                });

                if (Array.isArray(response.data.result)) {
                    setReasons(response.data.result);
                } else {
                    setReasons([]);
                    setError('No se pudo cargar la lista de motivos.');
                }
            } catch (err) {
                console.error('Error al obtener los motivos:', err);
                setError('No se pudo cargar la lista de motivos.');
                setReasons([]);
            }
        }
        fetchReasons();
    }, [selectedBranch, navigate]);

    function handleReasonChange(reasonId) {
        setSelectedReason(reasonId);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!selectedReason) {
            setError('Por favor, seleccione un motivo.');
            return;
        } else {
            localStorage.setItem('motivo', selectedReason);
        }

        try {
            const dni = localStorage.getItem('dni');
            const nombre = localStorage.getItem('nombre');
            const data = { dni, nombre, motivo: selectedReason, sucursal: selectedBranch };

            const response = await axios.post('http://turnero:8080/submitmotivo', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('dni');
                localStorage.removeItem('nombre');
                localStorage.removeItem('motivo');
                navigate('/turnolisto');
            } else {
                setError('Error al enviar la solicitud. Por favor, inténtelo nuevamente.');
            }
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Hubo un problema al enviar la solicitud.');
        }
    }

    return (
        <div className="wrapper">
            <h2>Seleccione Motivo de la Consulta</h2>
            <form onSubmit={handleSubmit}>
                <div className="button-group">
                    {reasons.map(reason => (
                        <button
                            key={reason.id}
                            type="button"
                            className={`reason-button ${selectedReason === reason.id ? 'selected' : ''}`}
                            onClick={() => handleReasonChange(reason.id)}
                        >
                            {reason.motivo}
                        </button>
                    ))}
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="button-container">
                    {selectedReason && (
                        <>
                            <button 
                                type="button" 
                                className="nav-button" 
                                onClick={() => navigate(-1)} // Navega a la página anterior
                            >
                            ◀ Anterior  {/* Flecha hacia la izquierda */}
                            </button>
                            <div className="input-box button">
                                <input type="submit" value="Confirmar" className="confirm-button" />
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SelectReason;
