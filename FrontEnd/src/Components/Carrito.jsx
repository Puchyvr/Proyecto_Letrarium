import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Carrito.css';

function Carrito({ onClose }) {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Debes iniciar sesión para ver el carrito');
            setLoading(false);
            return;
        }

        const fetchCart = async () => {
            try {
                setLoading(true);
                const items = await api.get('/api/cart');
                setCartItems(items);

                // Obtener información de los productos
                if (items.length > 0) {
                    const productIds = items.map(item => item.productId);
                    const productsData = await Promise.all(
                        productIds.map(id => api.get(`/api/products/${id}`))
                    );
                    const productsMap = {};
                    productsData.forEach(product => {
                        productsMap[product.id] = product;
                    });
                    setProducts(productsMap);
                }
            } catch (err) {
                console.error('Error al cargar carrito:', err);
                setError(err.message || 'Error al cargar el carrito');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }

        try {
            await api.put(`/api/cart/${itemId}`, { quantity: newQuantity });
            setCartItems(items =>
                items.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error('Error al actualizar cantidad:', err);
            alert(err.message || 'Error al actualizar cantidad');
        }
    };

    const removeItem = async (itemId) => {
        try {
            await api.delete(`/api/cart/${itemId}`);
            setCartItems(items => items.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Error al eliminar item:', err);
            alert(err.message || 'Error al eliminar item');
        }
    };

    const clearCart = async (showConfirm = true) => {
        if (showConfirm && !window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            return;
        }

        try {
            await api.delete('/api/cart');
            setCartItems([]);
        } catch (err) {
            console.error('Error al vaciar carrito:', err);
            if (showConfirm) {
                alert(err.message || 'Error al vaciar carrito');
            }
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = products[item.productId];
            if (product) {
                return total + (product.price * item.quantity);
            }
            return total;
        }, 0);
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        try {
            const items = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }));

            const response = await api.post('/api/orders', { items });
            alert(`¡Orden creada exitosamente! ID de orden: ${response.orderId}\nTotal: $${response.total.toFixed(2)}`);
            
            // Limpiar el carrito después de crear la orden
            await clearCart();
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error('Error al crear orden:', err);
            alert(err.message || 'Error al crear la orden');
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <p>Cargando carrito...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>×</button>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content carrito-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Carrito de Compras</h2>
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => {
                                const product = products[item.productId];
                                if (!product) return null;

                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{product.name}</h4>
                                            <p>${product.price.toFixed(2)} c/u</p>
                                        </div>
                                        <div className="cart-item-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="btn-quantity"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="btn-quantity"
                                            >
                                                <FaPlus />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="btn-remove"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <div className="cart-item-total">
                                            ${(product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                            </div>
                            <div className="cart-actions">
                                <button onClick={clearCart} className="btn-secondary">
                                    Vaciar Carrito
                                </button>
                                <button 
                                    onClick={handleCheckout} 
                                    className="btn-primary"
                                >
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carrito;

