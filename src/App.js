import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import './App.css';

// Componentes existentes
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoadingMessage from './components/LoadingMessage';
import PriceSlider from './components/PriceSlider';

// Lazy loading de componentes
const SearchComponent = lazy(() => import('./components/SearchComponent'));
const FilterBar = lazy(() => import('./components/FilterBar'));
const ProductCard = lazy(() => import('./components/ProductCard'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const ProductCarrusel = lazy(() => import('./components/ProductCarrusel'));

function App() {
  // Estados
  const [likedProducts, setLikedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [theme, setTheme] = useState(Cookies.get('theme') || 'light');
  const [scrapedProducts, setScrapedProducts] = useState([]);

  // Configuración de axios con interceptor para el token
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Sesión expirada. Por favor, vuelve a iniciar sesión.');
          // Aquí podrías redirigir al login o mostrar un modal
        }
        return Promise.reject(error);
      }
    );
  }, []);

  // Hook para obtener productos desde el backend
  useEffect(() => {
    const fetchScrapedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/descuentos');
        if (response.data && response.data.products) {
          setScrapedProducts(response.data.products);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        } else {
          throw new Error('Formato de respuesta inválido');
        }
      } catch (error) {
        setHasError(true);
        setErrorMessage(
          error.response?.data?.error || 'Error al cargar los descuentos. Por favor, intenta nuevamente.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchScrapedProducts();
  }, []);

  // Procesar productos
  useEffect(() => {
    const filteredDiscountedProducts = scrapedProducts.filter(
      product => product.previous_price !== "No disponible"
    );

    const sortedProducts = [...filteredDiscountedProducts].sort((a, b) => {
      const priceA = a.price === "Cupón" ? 1 : 0;
      const priceB = b.price === "Cupón" ? 1 : 0;
      return priceA - priceB;
    });

    setLikedProducts(sortedProducts);
    setFilteredProducts(sortedProducts);

    const prices = sortedProducts
      .map(product =>
        product.price !== "Cupón" ? parseInt(product.price.replace(/[^0-9]/g, "")) : null
      )
      .filter(price => price !== null);

    if (prices.length > 0) {
      const minPriceValue = Math.min(...prices);
      const maxPriceValue = Math.max(...prices);
      setMinPrice(minPriceValue - 100);
      setMaxPrice(maxPriceValue + 300);
      setPriceRange({ min: minPriceValue - 100, max: maxPriceValue + 300 });
    }
  }, [scrapedProducts]);

  // Cambiar tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Filtrar por categoría, tipo y precio
  const handleCategoryFilter = e => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    handleFilters(selectedCategory, priceFilter, typeFilter);
  };

  const handleTypeFilter = e => {
    const selectedType = e.target.value;
    setTypeFilter(selectedType);
    handleFilters(categoryFilter, priceFilter, selectedType);
  };

  const handlePriceSort = e => {
    const selectedPriceSort = e.target.value;
    setPriceFilter(selectedPriceSort);
    handleFilters(categoryFilter, selectedPriceSort, typeFilter);
  };

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
          const priceA = a.price === 'Cupón' ? Infinity : parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = b.price === 'Cupón' ? Infinity : parseInt(b.price.replace(/[^0-9]/g, ''));

          return selectedPriceSort === 'low-high' ? priceA - priceB : priceB - priceA;
        });
      }

      // Filtrar por rango de precios
      filtered = filtered.filter(product => {
        if (product.price === 'Cupón') {
          return true;
        }
        const price = parseInt(product.price.replace(/[^0-9]/g, ''));
        return price >= priceRange.min && price <= priceRange.max;
      });

      setFilteredProducts(filtered);
      setShowSuccessMessage(filtered.length > 0);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    setIsTransitioning(true);
    setTimeout(() => {
      handleFilters(categoryFilter, priceFilter, typeFilter);
      setIsTransitioning(false);
    }, 2000); // Tiempo de animación
  };

  const toggleLike = id => {
    setLikedProducts(likedProducts.map(p => (p.id === id ? { ...p, liked: !p.liked } : p)));
  };

  return (
    <Router>
      <Suspense fallback={<LoadingMessage message="Cargando componentes..." />}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={`min-h-screen text-center relative ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#DAEDF2] text-black'}`}>
                <Header theme={theme} toggleTheme={toggleTheme} />

                {isLoading && <LoadingMessage message="Cargando descuentos..." />}
                {hasError && <ErrorMessage message={errorMessage} />}
                {showSuccessMessage && (
                  <SuccessMessage message="Descuentos cargados correctamente" onClose={() => setShowSuccessMessage(false)} />
                )}

                <section className="my-12">
                  <h1 className="text-4xl font-bold mb-6">Descuentos Disponibles</h1>
                  <p className="text-lg mb-8">Encuentra los mejores descuentos en comida.</p>

                  <ProductCarrusel
                    products={scrapedProducts.filter(product => product.previous_price && product.previous_price !== "No disponible").slice(0, 5)}
                    theme={theme}
                  />

                  <SearchComponent products={likedProducts} setFilteredProducts={setFilteredProducts} />
                  <FilterBar
                    handleCategoryFilter={handleCategoryFilter}
                    handlePriceSort={handlePriceSort}
                    handleTypeFilter={handleTypeFilter}
                    theme={theme}
                  />
                  <PriceSlider minPrice={minPrice} maxPrice={maxPrice} onPriceRangeChange={handlePriceRangeChange} />
                </section>

                <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 mb-12 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  {filteredProducts.length === 0 ? (
                    <div className="flex items-center justify-center text-center text-xl font-semibold h-40 w-full">No hay descuentos disponibles.</div>
                  ) : (
                    filteredProducts.map(product => (
                      <ProductCard key={uuidv4()} product={product} toggleLike={toggleLike} theme={theme} />
                    ))
                  )}
                </section>

                <Footer />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
