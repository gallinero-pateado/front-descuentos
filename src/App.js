import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import productsFromFile from './components/cupones.json'; // Productos locales
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// Componentes de mensajes
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoadingMessage from './components/LoadingMessage';
import PriceSlider from './components/PriceSlider'; 

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
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });  // Estado del rango de precios
  const [minPrice, setMinPrice] = useState(0); // Min Price
  const [maxPrice, setMaxPrice] = useState(10000); // Max Price

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
  
    // **Ordenar por precio al inicio**: Primero los productos con precio, luego los productos sin precio
    const sortedProducts = combinedProducts.sort((a, b) => {
      const priceA = a.price === 'Sin Precio' ? 1 : 0;
      const priceB = b.price === 'Sin Precio' ? 1 : 0;
      return priceA - priceB;
    });
  
    setLikedProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
  
    // Encontrar el rango de precios mínimo y máximo entre los productos con precio
    const prices = sortedProducts
      .map(product => product.price !== 'Sin Precio' ? parseInt(product.price.replace(/[^0-9]/g, "")) : null)
      .filter(price => price !== null);
  
    if (prices.length > 0) {
      const minPriceValue = Math.min(...prices);
      const maxPriceValue = Math.max(...prices);
      setMinPrice(minPriceValue - 100);
      setMaxPrice(maxPriceValue + 300);
      setPriceRange({ min: minPriceValue - 100, max: maxPriceValue + 300 });
    }
  
  }, [scrapedProducts]);

  // Filtrar productos por categoría, tipo, precio y rango de precios
  const handleFilters = (selectedCategory, selectedPriceSort, selectedType) => {
    setIsLoading(true);
    setHasError(false);

    try {
      let filtered = [...likedProducts];

      // Filtrar por categoría
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Filtrar por tipo
      if (selectedType) {
        filtered = filtered.filter(product => product.type === selectedType);
      }

      // Ordenar por precio
      if (selectedPriceSort) {
        filtered = filtered.sort((a, b) => {
          const priceA = a.price === 'Sin Precio' ? Infinity : parseInt(a.price.replace(/[^0-9]/g, ""));
          const priceB = b.price === 'Sin Precio' ? Infinity : parseInt(b.price.replace(/[^0-9]/g, ""));

          return selectedPriceSort === 'low-high' ? priceA - priceB : priceB - priceA;
        });
      }

      // **Filtrar por rango de precios, pero incluir productos "Sin Precio"**
      filtered = filtered.filter(product => {
        if (product.price === 'Sin Precio') {
          return true; // Siempre incluir productos sin precio
        }
        const price = parseInt(product.price.replace(/[^0-9]/g, ""));
        return price >= priceRange.min && price <= priceRange.max;
      });

      // Ordenar productos "Sin Precio" al final
      filtered = filtered.sort((a, b) => {
        const priceA = a.price === 'Sin Precio' ? 1 : 0;
        const priceB = b.price === 'Sin Precio' ? 1 : 0;
        return priceA - priceB;
      });

      setFilteredProducts(filtered);
      setShowSuccessMessage(filtered.length > 0); // Mostrar mensaje solo si hay productos
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar el cambio de rango de precios
  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    handleFilters(categoryFilter, priceFilter, typeFilter);
  };

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    handleFilters(selectedCategory, priceFilter, typeFilter);
  };

  const handleTypeFilter = (e) => {
    const selectedType = e.target.value;
    setTypeFilter(selectedType);
    handleFilters(categoryFilter, priceFilter, selectedType);
  };

  const handlePriceSort = (e) => {
    const selectedPriceSort = e.target.value;
    setPriceFilter(selectedPriceSort);
    handleFilters(categoryFilter, selectedPriceSort, typeFilter);
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
                  handleTypeFilter={handleTypeFilter} 
                />

                {/* Slider de precio */}
                <PriceSlider 
                  minPrice={minPrice} 
                  maxPrice={maxPrice} 
                  onPriceRangeChange={handlePriceRangeChange} 
                />
              </section>

              {/* Tarjetas de productos */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mb-12">
                {filteredProducts.length === 0 ? (
                  <div className="flex items-center justify-center text-center text-xl font-semibold text-gray-600 h-40 w-full">
                    No hay productos disponibles.
                  </div>
                ) : (
                  filteredProducts.map(product => (
                    <ProductCard key={uuidv4()} product={product} toggleLike={toggleLike} />
                  ))
                )}
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
