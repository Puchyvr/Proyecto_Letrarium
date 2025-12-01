// Ejemplo de cómo usar la API en tus componentes
import { api } from '../config/api';

// Ejemplo: Obtener productos
export const getProducts = async () => {
  try {
    const products = await api.get('/api/products');
    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Ejemplo: Registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Ejemplo: Login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    // Guardar token en localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

// Ejemplo: Obtener categorías
export const getCategories = async () => {
  try {
    const categories = await api.get('/api/categories');
    return categories;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

