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

    // Cargar motivos según la sucursal seleccionada
    useEffect(() => {
        if (!selectedBranch) {
            navigate('/'); // Redirigir al inicio si no se seleccionó una sucursal
            return;
        }

        async function fetchReasons() {
            try {
                const response = await axios.post(`http://turnero:8080/getmotivosbysucursal/${selectedBranch}`);
                setReasons(response.data);
            } catch (err) {
                console.error('Error al obtener los motivos:', err);
                setError('No se pudo cargar la lista de motivos.');
            }
        }
        fetchReasons();
    }, [selectedBranch, navigate]);

    // Manejar la selección del motivo
    function handleReasonChange(event) {
        setSelectedReason(event.target.value);
    }

    // Manejar el envío del formulario
    async function handleSubmit(event) {
        event.preventDefault();

        if (!selectedReason) {
            setError('Por favor, seleccione un motivo.');
            return;
        }

        try {
            const dni = localStorage.getItem('dni');
            const nombre = localStorage.getItem('nombre');
            const data = { dni, nombre, motivo: selectedReason, sucursal: selectedBranch };

            // Hacer el POST a la API externa
            const response = await axios.post('http://api.edemsa.local/turnero/turnos', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Eliminar datos del localStorage
                localStorage.removeItem('dni');
                localStorage.removeItem('nombre');
                localStorage.removeItem('motivo');
                navigate('/'); // Redirigir al inicio
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
                <div className="input-box">
                    <select 
                        className="dropdown"
                        value={selectedReason}
                        onChange={handleReasonChange}
                        required
                    >
                        <option value="" disabled>Seleccione un motivo</option>
                        {reasons.map(reason => (
                            <option key={reason.id} value={reason.nombre}>
                                {reason.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="input-box button">
                    <input type="submit" value="Confirmar" />
                </div>
            </form>
        </div>
    );
}

export default SelectReason;
