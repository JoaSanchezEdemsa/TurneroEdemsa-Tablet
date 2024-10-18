import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from './ConfirmacionPopUp';
import { IoIosArrowBack } from "react-icons/io";
import '../style/styles.css';

function SelectReason() {
    const [reasons, setReasons] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
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

    function handleConfirmClick() {
        setShowPopup(true);
    }

    function handlePopupClose() {
        localStorage.removeItem('dni');
        localStorage.removeItem('nombre');
        localStorage.removeItem('motivo');
        navigate('/paso1');
    }

    async function handlePopupConfirm() {
        try {
            const dni = localStorage.getItem('dni');
            const nombre = localStorage.getItem('nombre');
            const data = { dni, nombre, motivo: selectedReason, COD_UNICOM: selectedBranch };

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
        setShowPopup(false);
    }

    return (
        <div className="wrapper">
            <div className="header-container">
                <IoIosArrowBack
                    className="back-arrow-2"
                    onClick={() => {
                        navigate(-1);
                        localStorage.removeItem('nombre');
                    }}
                />
                <h2>Seleccione el Motivo de la Consulta</h2>
            </div>
            <form onSubmit={handleConfirmClick}>
                <div className="policy">
                    <h3>DNI/CUIT: {localStorage.getItem('dni')} </h3>
                </div>
                <div className="policy">
                    <h3>Cliente: {localStorage.getItem('nombre')} </h3>
                </div>
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
                        <div className="input-box button">
                            <input type="button" value="Confirmar" className="confirm-button" onClick={handleConfirmClick} />
                        </div>
                    )}
                </div>
            </form>

            {showPopup && (
                <ConfirmationPopup
                    dni={localStorage.getItem('dni')}
                    nombre={localStorage.getItem('nombre')}
                    motivo={reasons.find(reason => reason.id === selectedReason)?.motivo}
                    onClose={handlePopupClose}
                    onConfirm={handlePopupConfirm}
                />
            )}
        </div>
    );
}

export default SelectReason;

