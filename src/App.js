import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // Para los estilos de modo claro/oscuro

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
  const [likedProducts, setLikedProducts] = useState([]); // Productos desde backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados

  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity }); // Estado del rango de precios
  const [minPrice, setMinPrice] = useState(0); // Min Price
  const [maxPrice, setMaxPrice] = useState(10000); // Max Price
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasError, setHasError] = useState(false); // Estado de error
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controla el mensaje de éxito

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Estado para el tema

  const [scrapedProducts, setScrapedProducts] = useState([]); // Productos del backend

  // Hook para obtener los productos desde el backend (scraping)
  useEffect(() => {
    const fetchScrapedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/descuentos'); // URL del backend
        setScrapedProducts(response.data); // Guardar productos obtenidos
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchScrapedProducts(); // Llamar a la función cuando el componente se monte
  }, []);

  // Procesar los productos obtenidos del backend
  useEffect(() => {
  // Filtrar los productos que tienen un precio anterior válido
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

  // Detectar preferencia del sistema y hora local para modo oscuro
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hour = new Date().getHours();

    if (hour >= 19 || hour < 6 || userPrefersDark) {
      setTheme('dark');
    }
  }, []);

  // Persistir el tema en el localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // Cambiar la clase del body para aplicar los estilos de tema
  }, [theme]);

  // Función para alternar entre modo claro y oscuro
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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

  // Manejar el cambio de rango de precios
  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    handleFilters(categoryFilter, priceFilter, typeFilter);
  };

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

                {isLoading && <LoadingMessage message="Cargando productos..." />}
                {hasError && <ErrorMessage message="Ocurrió un error al cargar los productos." />}
                {showSuccessMessage && (
                  <SuccessMessage message="Productos cargados correctamente." onClose={() => setShowSuccessMessage(false)} />
                )}

                <section className="my-12">
                  <h1 className="text-4xl font-bold mb-6">Bienvenido a la sección de descuentos</h1>
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

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 mb-12">
                  {filteredProducts.length === 0 ? (
                    <div className="flex items-center justify-center text-center text-xl font-semibold h-40 w-full">
                      No hay productos disponibles.
                    </div>
                  ) : (
                    filteredProducts.map(product => <ProductCard key={uuidv4()} product={product} toggleLike={toggleLike} theme={theme} />)
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
