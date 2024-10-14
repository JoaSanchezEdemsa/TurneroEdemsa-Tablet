import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

function SelectBranch() {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar la sucursal seleccionada del localStorage y redirigir si ya existe
    useEffect(() => {
        const savedBranch = localStorage.getItem('selectedBranch');
        if (savedBranch) {
            setSelectedBranch(savedBranch);
            navigate('/paso1');
        }
    }, [navigate]);

    // Obtener las sucursales desde la API
    useEffect(() => {
        async function fetchBranches() {
            try {
                const response = await axios.get('http://turnero:8080/getsucursales');
                setBranches(response.data);
            } catch (err) {
                console.error('Error al obtener las sucursales:', err);
                setError('No se pudo cargar la lista de sucursales.');
            }
        }
        fetchBranches();
    }, []);

    // Manejar la selección de una sucursal
    function handleBranchChange(event) {
        const selected = event.target.value;
        setSelectedBranch(selected);
        localStorage.setItem('selectedBranch', selected);
    }

    // Manejar el envío del formulario
    function handleSubmit(event) {
        event.preventDefault();
        if (selectedBranch) {
            navigate('/paso1');
        } else {
            setError('Por favor, seleccione una sucursal.');
        }
    }

    return (
        <div className="wrapper">
            <h2>Seleccione Sucursal</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <select 
                        className="dropdown"
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        required
                    >
                        <option value="" disabled>Seleccione una sucursal</option>
                        {branches.map(branch => (
                            <option key={branch.COD_UNICOM} value={branch.COD_UNICOM}>
                                {branch.NOM_UNICOM}
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

export default SelectBranch;
