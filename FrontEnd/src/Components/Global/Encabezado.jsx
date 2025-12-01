import { useState, useEffect } from 'react';
import Logo from '../../assets/Logo/LetrariumLogo.png'
import { GrCatalogOption } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { GrLogin, GrLogout } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ForgotPassword from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword';
import Carrito from '../Carrito';
import { IoPersonAddSharp } from "react-icons/io5";

function Encabezado({ user: propUser, onNavigateToAdmin }) {
  const [user, setUser] = useState(propUser || null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    } else {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error al parsear usuario:', e);
        }
      }
    }

    // Verificar si hay un token de recuperación en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
      setShowResetPassword(true);
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [propUser]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <header>
        <img src={Logo} alt="Logo" className='logo' />
        <div className="menu-centro">
            <a href="#productos-section" onClick={(e) => {
              e.preventDefault();
              const productosSection = document.getElementById('productos-section');
              if (productosSection) {
                productosSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}><GrCatalogOption />Catalogo</a>
            <a href="#nosotros" onClick={(e) => {
              e.preventDefault();
              const nosotrosSection = document.getElementById('nosotros-section');
              if (nosotrosSection) {
                nosotrosSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}><FiUsers />Nosotros</a>
        </div>
        <div className="menu-derecha">
            {user ? (
              <>
                <span className="user-name">Hola, {user.name}</span>
                {(user.role === 'admin' || user.role === 'superadmin') && onNavigateToAdmin && (
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToAdmin();
                    }} 
                    title="Panel de Administración"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FaCog /> Admin
                  </a>
                )}
                <a href="#" onClick={handleLogout} title="Cerrar Sesión">
                  <GrLogout />
                </a>
              </>
            ) : (
              <>
                <a href="#" onClick={() => { setShowLogin(true); setShowRegister(false); }} title="Iniciar Sesión">
                  <GrLogin />
                </a>
                <a href="#" onClick={() => { setShowRegister(true); setShowLogin(false); }} title="Registrarse">
                  <IoPersonAddSharp />
                </a>
              </>
            )}
            <a href="#" onClick={() => setShowCart(true)} title="Carrito">
              <FaShoppingCart />
            </a>
        </div>
      </header>
      {showLogin && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
          onShowForgotPassword={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onClose={() => setShowRegister(false)}
        />
      )}
      {showForgotPassword && (
        <ForgotPassword
          onClose={() => setShowForgotPassword(false)}
          onBackToLogin={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
        />
      )}
      {showResetPassword && (
        <ResetPassword
          token={resetToken}
          onClose={() => {
            setShowResetPassword(false);
            setResetToken(null);
          }}
          onSuccess={() => {
            setShowResetPassword(false);
            setResetToken(null);
            setShowLogin(true);
          }}
        />
      )}
      {showCart && (
        <Carrito onClose={() => setShowCart(false)} />
      )}
    </div>
  )
}

export default Encabezado
