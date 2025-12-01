import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { FaShoppingCart } from 'react-icons/fa';
import './Productos.css';

function Productos({ categoryId = null, onClearFilter }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const data = await api.get('/api/products');
                let filteredData = data;
                
                // Filtrar por categoría si se seleccionó una
                if (categoryId) {
                    filteredData = data.filter(p => p.categoryId === categoryId);
                }
                
                setProductos(filteredData);
                setError(null);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError('No se pudieron cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoryId]);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para agregar productos al carrito');
            return;
        }

        try {
            await api.post('/api/cart', {
                productId: productId,
                quantity: 1
            });
            alert('Producto agregado al carrito');
            // Actualizar el carrito local
            setCart([...cart, { productId, quantity: 1 }]);
        } catch (err) {
            console.error('Error al agregar al carrito:', err);
            alert(err.message || 'Error al agregar al carrito');
        }
    };

    if (loading) {
        return (
            <div className="contenedor-productos">
                <h2>Productos</h2>
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="contenedor-productos">
                <h2>Productos</h2>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="contenedor-productos">
            <h2>{categoryId ? 'Productos Filtrados' : 'Todos los Productos'}</h2>
            {categoryId && onClearFilter && (
                <button 
                    onClick={onClearFilter} 
                    className="btn-limpiar-filtro"
                >
                    Ver Todos los Productos
                </button>
            )}
            {productos.length === 0 ? (
                <p>No hay productos disponibles</p>
            ) : (
                <div className="grid-productos">
                    {productos.map((producto) => (
                        <div key={producto.id} className="tarjeta-producto">
                            {producto.imageUrl && (
                                <img 
                                    src={producto.imageUrl} 
                                    alt={producto.name}
                                    className="imagen-producto"
                                />
                            )}
                            <div className="info-producto">
                                <h3>{producto.name}</h3>
                                {producto.description && (
                                    <p className="descripcion-producto">{producto.description}</p>
                                )}
                                <div className="precio-stock">
                                    <span className="precio">${producto.price?.toFixed(2) || '0.00'}</span>
                                    <span className={`stock ${producto.stock > 0 ? 'disponible' : 'agotado'}`}>
                                        {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                                    </span>
                                </div>
                                <button
                                    className="btn-agregar-carrito"
                                    onClick={() => handleAddToCart(producto.id)}
                                    disabled={producto.stock === 0}
                                >
                                    <FaShoppingCart /> Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Productos;

