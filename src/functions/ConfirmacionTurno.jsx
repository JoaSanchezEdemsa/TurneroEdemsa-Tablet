import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const TurnoRegistrado = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className="wrapper">
            <h1 style={{ fontSize: '48px', textAlign: 'center', color: '#333' }}>
                Su turno ha sido registrado
            </h1>
            <p style={{ fontSize: '24px', textAlign: 'center', color: '#666' }}>
                Espere a ser atendido
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                    onClick={handleRedirect}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        color: '#fff',
                        backgroundColor: '#4070f4',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default TurnoRegistrado;
