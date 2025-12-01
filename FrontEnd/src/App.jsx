import { useState, useEffect } from 'react';
import Layouts from "./Components/Layouts";
import AdminProductos from "./Components/Admin/AdminProductos";

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error al parsear usuario:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Escuchar cambios en localStorage para actualizar el usuario
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error al parsear usuario:', e);
        }
      } else {
        setUser(null);
        setCurrentView('home');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // También escuchar cambios locales
    const interval = setInterval(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.role !== user?.role) {
            setUser(parsedUser);
          }
        } catch (e) {
          // Ignorar errores
        }
      } else if (user) {
        setUser(null);
        setCurrentView('home');
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  return (
    <>
      {currentView === 'home' ? (
        <Layouts 
          user={user} 
          onNavigateToAdmin={() => setCurrentView('admin')}
        />
      ) : (
        <div>
          <div style={{ 
            padding: '10px 20px', 
            background: '#f5f5f5', 
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0 }}>Panel de Administración</h2>
            <button 
              onClick={() => setCurrentView('home')}
              style={{
                padding: '8px 16px',
                background: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Volver al Inicio
            </button>
          </div>
          <AdminProductos />
        </div>
      )}
    </>
  )
}

export default App
