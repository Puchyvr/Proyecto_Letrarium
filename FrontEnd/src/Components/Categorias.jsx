import { useState, useEffect } from 'react';
import { api } from '../config/api';
import './Categorias.css';

function Categorias({ onCategorySelect }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Iconos por defecto para categorías
    const defaultIcons = {
        'Novelas': '📖',
        'Ciencia Ficción': '🚀',
        'Cómics': '💥',
        'Fantasía': '🧙',
        'Romance': '💕',
        'default': '📚'
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                setLoading(true);
                const data = await api.get('/api/categories');
                setCategorias(data);
                setError(null);
            } catch (err) {
                console.error('Error al cargar categorías:', err);
                setError('No se pudieron cargar las categorías');
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        if (onCategorySelect) {
            onCategorySelect(category.id);
        }
    };

    if (loading) {
        return (
            <div className="contenedor-categorias">
                <h2>Categorías</h2>
                <div className="cantidad-categorias">
                    <p>Cargando categorías...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="contenedor-categorias">
                <h2>Categorías</h2>
                <div className="cantidad-categorias">
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="contenedor-categorias">
                <h2>Categorías</h2>
                <div className="cantidad-categorias">
                    {categorias.length === 0 ? (
                        <p>No hay categorías disponibles</p>
                    ) : (
                        categorias.map((cat) => {
                            const icon = defaultIcons[cat.name] || defaultIcons['default'];
                            return (
                                <button
                                    key={cat.id}
                                    className={`tarjeta-categoria ${selectedCategory === cat.id ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    <span className="icono-categoria">{icon}</span>
                                    <span className="nombre-categoria">{cat.name}</span>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Categorias
