import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

function SelectSucursal() {
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar las sucursales desde la API al montar el componente
    useEffect(() => {
        async function fetchSucursales() {
            try {
                const response = await axios.post('http://turnero:8080/getsucursales');
                console.log(response.data);
                if (response.data.success && Array.isArray(response.data.result)) {
                    setSucursales(response.data.result);
                } else {
                    console.error('La respuesta no es válida:', response.data);
                    setError('Error: la respuesta de la API no es válida.');
                }
            } catch (err) {
                console.error('Error al obtener sucursales:', err);
                setError('Hubo un error al cargar las sucursales.');
            }
        }

        fetchSucursales();

        // Cargar sucursal seleccionada desde el localStorage si existe
        const savedSucursal = localStorage.getItem('sucursal');
        if (savedSucursal) {
            setSelectedSucursal(savedSucursal);
            navigate('/paso1'); // Redirigir si ya se seleccionó previamente una sucursal
        }
    }, [navigate]);

    // Manejar la selección de una sucursal
    function handleSucursalChange(event) {
        const selected = event.target.value;
        setSelectedSucursal(selected);
        localStorage.setItem('sucursal', selected); // Guardar en localStorage
    }

    // Enviar formulario y redirigir
    async function handleSubmit(event) {
        event.preventDefault();
        if (selectedSucursal) {
            try {
                navigate('/paso1');
            } catch (err) {
                console.error('Error al procesar la selección de sucursal:', err);
                setError('Hubo un error al procesar tu solicitud.');
            }
        } else {
            setError('Por favor seleccione una sucursal.');
        }
    }

    return (
        <div className="wrapper">
            <h2>Turnos</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <select
                        className="form-control dropdown"
                        value={selectedSucursal}
                        onChange={handleSucursalChange}
                        required
                    >
                        <option value="" disabled>Seleccione una sucursal</option>
                        {sucursales.map(sucursal => (
                            <option key={sucursal.COD_UNICOM} value={sucursal.COD_UNICOM}>
                                {sucursal.NOM_UNICOM}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="policy">
                    <h3>Edemsa 2024</h3>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div className="input-box button">
                    <input type="submit" value="Enviar" />
                </div>
            </form>
        </div>
    );
}

export default SelectSucursal;
