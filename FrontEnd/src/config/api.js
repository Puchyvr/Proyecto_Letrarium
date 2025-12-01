// Configuración de la API
// En desarrollo, usa el proxy de Vite (ruta relativa)
// En producción, usa la variable de entorno o la URL completa
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '' : 'http://localhost:4000');

// Función helper para hacer peticiones fetch con configuración por defecto
export const apiRequest = async (endpoint, options = {}) => {
  // Si API_BASE_URL está vacío (desarrollo con proxy), usa la ruta relativa
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Agregar token de autenticación si existe
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      // Intentar parsear el error como JSON, si falla usar el texto
      let errorData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        const text = await response.text();
        errorData = { message: text || 'Error en la petición' };
      }
      throw new Error(errorData.message || 'Error en la petición');
    }

    // Si la respuesta está vacía (204 No Content), retornar null
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    // Intentar parsear como JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    }

    // Si no es JSON, retornar el texto
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error en la petición API:', error);
    throw error;
  }
};

// Funciones helper para métodos HTTP comunes
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default API_BASE_URL;

