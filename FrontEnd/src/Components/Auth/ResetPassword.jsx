import { useState, useEffect } from 'react';
import { api } from '../../config/api';
import './Auth.css';

function ResetPassword({ token, onSuccess, onClose }) {
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Token de recuperación no válido o faltante');
        }
    }, [token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!token) {
            setError('Token de recuperación no válido');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            await api.post('/api/auth/reset', {
                token,
                password: formData.password
            });
            setSuccess(true);
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'Error al restablecer la contraseña. El enlace puede haber expirado.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="modal-overlay" style={{ display: 'flex' }}>
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>×</button>
                    <h2>Error</h2>
                    <div className="error-message">
                        Token de recuperación no válido o faltante.
                    </div>
                    <button 
                        onClick={onClose || (() => window.location.href = '/')} 
                        className="btn-primary"
                        style={{ marginTop: '15px' }}
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Restablecer Contraseña</h2>
                
                {success ? (
                    <div className="success-message">
                        <p>✅ Tu contraseña ha sido restablecida exitosamente.</p>
                        <p>Serás redirigido al inicio de sesión en unos segundos...</p>
                        <button 
                            onClick={onClose || (() => window.location.href = '/')} 
                            className="btn-primary"
                            style={{ marginTop: '15px' }}
                        >
                            Ir a Iniciar Sesión
                        </button>
                    </div>
                ) : (
                    <>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Ingresa tu nueva contraseña. Asegúrate de que tenga al menos 6 caracteres.
                        </p>
                        {error && <div className="error-message">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirmar Contraseña:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;

