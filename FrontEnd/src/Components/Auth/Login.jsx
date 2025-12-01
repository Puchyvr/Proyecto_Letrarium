import { useState } from 'react';
import { api } from '../../config/api';
import './Auth.css';

function Login({ onLoginSuccess, onClose, onShowForgotPassword }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validar formato de email
        if (!validateEmail(formData.email)) {
            setError('Por favor ingresa un correo electrónico válido');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/api/auth/login', formData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                // Disparar evento para actualizar el estado en App
                window.dispatchEvent(new Event('storage'));
                if (onLoginSuccess) {
                    onLoginSuccess(response.user);
                }
                if (onClose) {
                    onClose();
                }
            }
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Iniciar Sesión</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onShowForgotPassword) {
                                    onShowForgotPassword();
                                }
                            }}
                            className="btn-link"
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#007bff', 
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '14px'
                            }}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

