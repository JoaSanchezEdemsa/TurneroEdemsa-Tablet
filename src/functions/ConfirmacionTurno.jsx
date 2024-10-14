import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css'; 

const TurnoRegistrado = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir a la página de inicio después de 15 segundos
        const timer = setTimeout(() => {
            navigate('/');
        }, 15000);

        // Limpiar el timer si el componente se desmonta
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="wrapper">
            <h1 style={{ fontSize: '48px', textAlign: 'center', color: '#333' }}>
                Su turno ha sido registrado
            </h1>
            <p style={{ fontSize: '24px', textAlign: 'center', color: '#666' }}>
                Espere a ser atendido
            </p>
        </div>
    );
};

export default TurnoRegistrado;
