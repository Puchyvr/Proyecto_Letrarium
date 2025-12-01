import { useState } from 'react';
import { api } from '../../config/api';
import './Auth.css';

function ForgotPassword({ onClose, onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Validar formato de email
        if (!validateEmail(email)) {
            setError('Por favor ingresa un correo electrónico válido');
            setLoading(false);
            return;
        }

        try {
            await api.post('/api/auth/forgot', { email });
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error al enviar el correo de recuperación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Recuperar Contraseña</h2>
                
                {success ? (
                    <div className="success-message">
                        <p>✅ Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.</p>
                        <p>Por favor, revisa tu bandeja de entrada (y la carpeta de spam).</p>
                        <p className="info-text">El enlace expirará en 30 minutos.</p>
                        {onBackToLogin && (
                            <button 
                                onClick={onBackToLogin} 
                                className="btn-primary"
                                style={{ marginTop: '15px' }}
                            >
                                Volver a Iniciar Sesión
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                        {error && <div className="error-message">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                            </button>
                        </form>
                        {onBackToLogin && (
                            <button 
                                onClick={onBackToLogin} 
                                className="btn-link"
                                style={{ marginTop: '15px', width: '100%' }}
                            >
                                ← Volver a Iniciar Sesión
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;

