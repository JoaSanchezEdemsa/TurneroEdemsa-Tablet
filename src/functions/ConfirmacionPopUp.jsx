import React from 'react';
import '../style/styles.css';

function ConfirmationPopup({ dni, nombre, motivo, onClose, onConfirm }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>¿Los datos ingresados son correctos?</h3>
                <ul>
                    <li>DNI: {dni}</li>
                    <li>Nombre: {nombre}</li>
                    <li>Motivo: {motivo}</li>
                </ul>
                <div className="popup-buttons">
                    <button className="popup-button" onClick={onClose}>Cancelar</button>
                    <button className="popup-button" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;
