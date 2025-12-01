import { useState } from 'react';
import Encabezado from './Global/Encabezado'
import './Layouts.css'
import Banner from './Banner'
import Categorias from './Categorias'
import Productos from './Productos'
import Nosotros from './Nosotros'

function Layouts({ user, onNavigateToAdmin }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    // Si se hace clic en la misma categoría, deseleccionarla
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    // Scroll suave hacia los productos
    setTimeout(() => {
      const productosSection = document.getElementById('productos-section');
      if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div>
      <Encabezado user={user} onNavigateToAdmin={onNavigateToAdmin}/>
      <Banner/>
      <Categorias onCategorySelect={handleCategorySelect} />
      <div id="productos-section">
        <Productos 
          categoryId={selectedCategory} 
          onClearFilter={() => setSelectedCategory(null)}
        />
      </div>
      <Nosotros />
    </div>
  )
}

export default Layouts
