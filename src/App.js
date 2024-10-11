import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import products from './components/products'; // Importar la lista de productos
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoadingMessage from './components/LoadingMessage';

// Importación de componentes con lazy loading
const SearchComponent = lazy(() => import('./components/SearchComponent'));
const FilterBar = lazy(() => import('./components/FilterBar'));
const ProductCard = lazy(() => import('./components/ProductCard'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const ProductCarrusel = lazy(() => import('./components/ProductCarrusel')); // Importar el carrusel de productos destacados

// Componente principal de la aplicación
function App() {
  const [likedProducts, setLikedProducts] = useState(products); // Estado para gestionar los productos con "me gusta"
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado de productos filtrados
  const [categoryFilter, setCategoryFilter] = useState(""); // Estado del filtro de categoría
  const [priceFilter, setPriceFilter] = useState(""); // Estado del filtro de precios
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasError, setHasError] = useState(false);   // Estado de error
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para mostrar el mensaje de éxito

  // Función para aplicar filtros de categoría y orden de precios
  const handleFilters = (selectedCategory, selectedPriceSort) => {
    setIsLoading(true); // Iniciar estado de carga
    setHasError(false);

    try {
      let filtered = [...likedProducts];

      // Filtrar por categoría seleccionada
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Ordenar por precio seleccionado (ascendente o descendente)
      if (selectedPriceSort) {
        filtered = filtered.sort((a, b) => selectedPriceSort === 'low-high' ? a.price - b.price : b.price - a.price);
      }

      setFilteredProducts(filtered); // Actualizar el estado de productos filtrados
      setShowSuccessMessage(true); // Mostrar mensaje de éxito
    } catch (error) {
      setHasError(true); // Capturar errores y mostrar mensaje de error
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  };

  // Función para gestionar el filtro de categoría
  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    handleFilters(selectedCategory, priceFilter);
  };

  // Función para gestionar el filtro de orden de precios
  const handlePriceSort = (e) => {
    const selectedPriceSort = e.target.value;
    setPriceFilter(selectedPriceSort);
    handleFilters(categoryFilter, selectedPriceSort);
  };

  // Función para alternar el estado de "me gusta" en un producto específico
  const toggleLike = (id) => {
    setLikedProducts(likedProducts.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  return (
    <Router>
      <Suspense fallback={<LoadingMessage message="Cargando componentes..." />}>
        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gray-100 text-center relative">
              <Header /> {/* Muestra el header de la aplicación */}

              {/* Mensajes de estado */}
              {isLoading && <LoadingMessage message="Cargando productos..." />}
              {hasError && <ErrorMessage message="Ocurrió un error al cargar los productos." />}
              {showSuccessMessage && (
                <SuccessMessage
                  message="Productos cargados correctamente."
                  onClose={() => setShowSuccessMessage(false)} // Ocultar mensaje de éxito después de unos segundos
                />
              )}

              {/* Sección principal */}
              <section className="my-12">
                <h1 className="text-4xl font-bold text-blue-800 mb-6">Bienvenido a la sección de descuentos</h1>
                <p className="text-lg mb-8 text-gray-600">Encuentra los mejores descuentos en comida.</p>

                {/* Componente del carrusel de productos destacados */}
                <ProductCarrusel products={products.slice(0, 5)} />

                {/* Barra de búsqueda y filtros */}
                <SearchComponent products={likedProducts} setFilteredProducts={setFilteredProducts} />
                <FilterBar handleCategoryFilter={handleCategoryFilter} handlePriceSort={handlePriceSort} />
              </section>

              {/* Sección de tarjetas de productos */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mb-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} toggleLike={toggleLike} />
                ))}
              </section>

              <Footer /> {/* Muestra el footer de la aplicación */}
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
