import { useState, useEffect } from 'react';
import { api } from '../../config/api';
import './AdminProductos.css';

function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: ''
    });

    useEffect(() => {
        fetchProductos();
        fetchCategorias();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const data = await api.get('/api/products');
            setProductos(data);
            setError(null);
        } catch (err) {
            console.error('Error al cargar productos:', err);
            setError('No se pudieron cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategorias = async () => {
        try {
            const data = await api.get('/api/categories');
            setCategorias(data);
        } catch (err) {
            console.error('Error al cargar categorías:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (editingProduct) {
                // Actualizar producto
                await api.put(`/api/products/${editingProduct.id}`, formData);
            } else {
                // Crear producto
                await api.post('/api/products', formData);
            }
            await fetchProductos();
            resetForm();
        } catch (err) {
            setError(err.message || 'Error al guardar el producto');
        }
    };

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setFormData({
            title: producto.title || producto.name || '',
            description: producto.description || '',
            price: producto.price?.toString() || '',
            stock: producto.stock?.toString() || '',
            imageUrl: producto.imageUrl || producto.image || '',
            categoryId: producto.categoryId?.toString() || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }

        try {
            await api.delete(`/api/products/${id}`);
            await fetchProductos();
        } catch (err) {
            setError(err.message || 'Error al eliminar el producto');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            stock: '',
            imageUrl: '',
            categoryId: ''
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading && productos.length === 0) {
        return (
            <div className="admin-productos">
                <h2>Administración de Productos</h2>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="admin-productos">
            <div className="admin-header">
                <h2>Administración de Productos</h2>
                <button 
                    className="btn-agregar" 
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    + Agregar Producto
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>URL de Imagen:</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoría:</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {editingProduct ? 'Actualizar' : 'Crear'}
                                </button>
                                <button type="button" onClick={resetForm} className="btn-secondary">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="productos-table">
                {productos.length === 0 ? (
                    <p>No hay productos disponibles</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>
                                        {(producto.imageUrl || producto.image) ? (
                                            <img 
                                                src={producto.imageUrl || producto.image} 
                                                alt={producto.title || producto.name}
                                                className="product-thumb"
                                            />
                                        ) : (
                                            <span>Sin imagen</span>
                                        )}
                                    </td>
                                    <td>{producto.title || producto.name}</td>
                                    <td className="description-cell">
                                        {producto.description || '-'}
                                    </td>
                                    <td>${producto.price?.toFixed(2) || '0.00'}</td>
                                    <td>{producto.stock || 0}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminProductos;

