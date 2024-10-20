import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import productsFromFile from './components/cupones.json'; // Productos locales
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// Componentes de mensajes
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoadingMessage from './components/LoadingMessage';

// Lazy loading
const SearchComponent = lazy(() => import('./components/SearchComponent'));
const FilterBar = lazy(() => import('./components/FilterBar'));
const ProductCard = lazy(() => import('./components/ProductCard'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const ProductCarrusel = lazy(() => import('./components/ProductCarrusel'));

function App() {
  const [likedProducts, setLikedProducts] = useState(productsFromFile);  // Productos desde JSON local
  const [filteredProducts, setFilteredProducts] = useState(productsFromFile);  // Productos filtrados
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });  // Estado del rango de precios

  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasError, setHasError] = useState(false);   // Estado de error
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controla el mensaje de éxito

  // Estado para los productos del scraping
  const [scrapedProducts, setScrapedProducts] = useState([]);

  // Hook para obtener los productos desde el backend (scraping)
  useEffect(() => {
    const fetchScrapedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/productos'); // URL del backend
        setScrapedProducts(response.data); // Guardar productos obtenidos
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchScrapedProducts(); // Llamar a la función cuando el componente se monte
  }, []);

  // Combinar productos locales con productos obtenidos del scraping
  useEffect(() => {
    const combinedProducts = [...productsFromFile, ...scrapedProducts];
    setLikedProducts(combinedProducts);
    setFilteredProducts(combinedProducts);
  }, [scrapedProducts]);

  // Filtrar productos por categoría, precio y rango de precios
  const handleFilters = (selectedCategory, selectedPriceSort) => {
    setIsLoading(true);
    setHasError(false);

    try {
      let filtered = [...likedProducts];

      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Ordenar por precio
      if (selectedPriceSort) {
        filtered = filtered.sort((a, b) => {
          const priceA = a.price === 'Sin Precio' ? Infinity : parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
          const priceB = b.price === 'Sin Precio' ? Infinity : parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

          return selectedPriceSort === 'low-high' ? priceA - priceB : priceB - priceA;
        });
      }

      // Filtrar por rango de precios
      filtered = filtered.filter(product => {
        const price = product.price === 'Sin Precio' ? Infinity : parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        return price >= priceRange.min && price <= priceRange.max;
      });

      setFilteredProducts(filtered);

      // Mostrar el mensaje de éxito
      setShowSuccessMessage(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar el cambio de rango de precios
  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    handleFilters(categoryFilter, priceFilter);
  };

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    handleFilters(selectedCategory, priceFilter);
  };

  const handlePriceSort = (e) => {
    const selectedPriceSort = e.target.value;
    setPriceFilter(selectedPriceSort);
    handleFilters(categoryFilter, selectedPriceSort);
  };

  const toggleLike = (id) => {
    setLikedProducts(likedProducts.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  return (
    <Router>
      <Suspense fallback={<LoadingMessage message="Cargando componentes..." />}>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-[#DAEDF2] text-center relative">
              <Header /> {/* Manda el header */}

              {/* Mensajes de estado */}
              {isLoading && <LoadingMessage message="Cargando productos..." />}
              {hasError && <ErrorMessage message="Ocurrió un error al cargar los productos." />}
              {showSuccessMessage && (
                <SuccessMessage
                  message="Productos cargados correctamente."
                  onClose={() => setShowSuccessMessage(false)} // Oculta el mensaje después de 5 segundos
                />
              )}

              {/* Sección principal */}
              <section className="my-12">
                <h1 className="text-4xl font-bold text-[#0092bc] mb-6">Bienvenido a la sección de descuentos</h1>
                <p className="text-lg mb-8 text-gray-600">Encuentra los mejores descuentos en comida.</p>

                  {/* Componente del carrusel de productos destacados */}
                  <ProductCarrusel products={scrapedProducts.slice(0, 5)} />

                <SearchComponent products={likedProducts} setFilteredProducts={setFilteredProducts} />
                <FilterBar 
                  handleCategoryFilter={handleCategoryFilter} 
                  handlePriceSort={handlePriceSort} 
                  onPriceRangeChange={handlePriceRangeChange} // Pasar el filtro de rango de precios
                />
              </section>

              {/* Tarjetas de productos */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mb-12">
                {filteredProducts.map(product => (
                <ProductCard key={uuidv4()} product={product} toggleLike={toggleLike} />))}
                </section>

              <Footer /> {/* Manda el footer */}
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
