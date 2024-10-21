import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import './PriceSlider.css';

const PriceSlider = ({ minPrice, maxPrice, onPriceRangeChange }) => {
  const [values, setValues] = useState([minPrice, maxPrice]);

  // Actualizar el slider cuando los precios mínimos o máximos cambian
  useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (newValues) => {
    setValues(newValues);
    onPriceRangeChange(newValues[0], newValues[1]);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
      <h2>Filtrar por Rango de Precios</h2>
      <p>Rango de precio: ${values[0]} - ${values[1]}</p>
      <Slider
        className="slider"
        value={values}
        onChange={handleChange}
        min={minPrice}
        max={maxPrice}
        renderTrack={(props, state) => {
          const [min, max] = state.value;
          return (
            <>
              {/* Track antes del primer thumb (gris) */}
              <div
                {...props}
                className="track"
                key={`track-before-${min}`} // Clave única basada en valor mínimo
                style={{
                  ...props.style,
                  backgroundColor: '#e2e2e8',
                  left: '0%',
                  width: `${(min - minPrice) / (maxPrice - minPrice) * 100}%`
                }}
              />
              {/* Track entre los thumbs (azul) */}
              <div
                {...props}
                className="track-1"
                key={`track-middle-${min}-${max}`} // Clave única basada en valores de min y max
                style={{
                  ...props.style,
                  backgroundColor: '#0092BC',
                  left: `${(min - minPrice) / (maxPrice - minPrice) * 100}%`,
                  width: `${(max - min) / (maxPrice - minPrice) * 100}%`
                }}
              />
              {/* Track después del segundo thumb (gris) */}
              <div
                {...props}
                className="track"
                key={`track-after-${max}`} // Clave única basada en valor máximo
                style={{
                  ...props.style,
                  backgroundColor: '#e2e2e8',
                  left: `${(max - minPrice) / (maxPrice - minPrice) * 100}%`,
                  width: `${(maxPrice - max) / (maxPrice - minPrice) * 100}%`
                }}
              />
            </>
          );
        }}
        renderThumb={(props, state) => <div {...props} className="thumb" key={`thumb-${state.index}`} />} // Clave única para los thumbs
      />
    </div>
  );
};

export default PriceSlider;
