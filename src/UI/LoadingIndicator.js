import React from 'react';

export const LoadingIndicator = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner-progress">
                    <svg viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                </div>
                <span>Đang tải...</span>
            </div>
        </div>
    );
}
import React from 'react';

export const Toast = ({ message, type = 'info', duration = 3000 }) => {
    return (
        <div className={`toast-notification ${type}`}>
            <div className="toast-icon">
                {type === 'success' && <i className="bi bi-check-circle"></i>}
                {type === 'error' && <i className="bi bi-x-circle"></i>}
                {type === 'info' && <i className="bi bi-info-circle"></i>}
            </div>
            <div className="toast-message">{message}</div>
            <div className="toast-progress" style={{animationDuration: `${duration}ms`}}></div>
        </div>
    );
}