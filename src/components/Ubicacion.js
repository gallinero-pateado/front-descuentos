import React, { useEffect, useRef } from "react";

const Ubicacion = ({ theme }) => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Datos de ubicaciones
    const locales = [
      {
        id: 1,
        nombre: "Burger King Puente Alto, Av. Concha y Toro 486",
        coords: { lat: -33.60729633832972, lng: -70.57610343834551 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 2,
        nombre: "Burger King Cerrillos, Av. Américo Vespucio 1501",
        coords: { lat: -33.517061821284194, lng: -70.7167230251698 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 3,
        nombre: "Burger King Estacion Central, José Luis Coo, 42-94",
        coords: { lat: -33.45241809332224, lng: -70.68204002703584 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 4,
        nombre: "Burger King Vicuña Mackenna, Av. Vicuña Mackenna 7909",
        coords: { lat: -33.52733448458769, lng: -70.59636957982309 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 5,
        nombre: "Burger King Ñuñoa, Av. Irarrázaval 2912",
        coords: { lat: -33.454251111168894, lng: -70.60017107467006 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 6,
        nombre: "Burger King Portal Ñuñoa,Av. José Pedro Alessandri 1132",
        coords: { lat: -33.46508166968965, lng: -70.59768738020945 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 7,
        nombre: "Burger King Macul, Av. Macul 2848",
        coords: { lat: -33.48061959258466, lng: -70.5982293611743 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 8,
        nombre: "Wendy's Plaza Egaña, Av. Larraín 5862",
        coords: { lat: -33.453155810151685, lng: -70.56893095137478 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 9,
        nombre: "Wendy's San Miguel, Av. Departamental 1201",
        coords: { lat: -33.49116936175694, lng: -70.64865453642527 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 10,
        nombre: "Wendy's Florida Center, Av. Vicuña Mackenna 6100",
        coords: { lat: -33.51044184465672, lng: -70.60780874952509 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 11,
        nombre: "Wendy's Q Center, Av. Tobalaba 12175",
        coords: { lat: -33.486872805692876, lng: -70.55889738205477 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },

      {
        id: 12,
        nombre: "OXXO Puente Alto, Av. Concha y Toro N°199",
        coords: { lat: -33.609961, lng: -70.575683 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },

      {
        id: 13,
        nombre: "OXXO La Florida, Av. Vicuña Mackenna Ote. 7492",
        coords: { lat: -33.52119011154957, lng: -70.59846537881236 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 14,
        nombre: "OXXO La Florida, Sta. Delia 8937",
        coords: { lat: -33.534384559748815, lng: -70.57028185710975 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 15,
        nombre: "OXXO San Joaquín, Av. Carlos Valdovinos 200",
        coords: { lat: -33.48565310705448, lng: -70.62724002863375},
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 16,
        nombre: "OXXO Ñuñoa, José Domingo Cañas 1701",
        coords: { lat: -33.45668230640125, lng: -70.6138896357936 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 17,
        nombre: "OXXO, Nataniel Cox N°762",
        coords: { lat: -33.45514524077473, lng: -70.65227168472987 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 18,
        nombre: "OXXO, Nataniel Cox 2370",
        coords: { lat: -33.476210154095895, lng: -70.64961210364898 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 19,
        nombre: "Wendy's Gran Av. José Miguel Carrera 8503",
        coords: { lat: -33.533589576629424, lng: -70.6635911925377 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 20,
        nombre: "OXXO Providencia, Bellavista 052",
        coords: { lat: -33.43446857309095, lng: -70.63505503336056 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 21,
        nombre: "OXXO, Huérfanos 602",
        coords: { lat: -33.43916254812442, lng: -70.64559761894827 },
        icon: "https://oxxo.cl/img/logo-r.png",
      },
      {
        id: 22,
        nombre: "Wendy's, Av. Camilo Henríquez 3296",
        coords: { lat: -33.5694152129564, lng: -70.55699971650937 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 23,
        nombre: "Wendy's Maipu, Av. Américo Vespucio 399",
        coords: { lat: -33.481346983557586, lng: -70.75189915506826 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 24,
        nombre: "Wendy's Maipu, Av. Los Pajaritos 1790",
        coords: { lat: -33.511156829680004, lng: -70.75801501925191 },
        icon: "https://logos.logofury.com/logo_src/910bdf1513c8c5c2e6f6c4f8f2d4839c.png",
      },
      {
        id: 25,
        nombre: "Burger King, Av. Libertador Bernardo O'Higgins 1750",
        coords: { lat: -33.44693561064559, lng: -70.66107090813006 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 26,
        nombre: "Burger King San Miguel, Llano Subercaseaux 3519",
        coords: { lat: -33.48557671587961, lng: -70.6509332437733 },
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 27,
        nombre: "Burger King La Florida, Av. Vicuña Mackenna 7909",
        coords: { lat: -33.52739904760571, lng: -70.59688845846495},
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },
      {
        id: 28,
        nombre: "Burger King Independencia, Av. Independencia 684",
        coords: { lat: -33.423326470159985, lng: -70.65552515975446},
        icon: "https://s3-eu-central-1.amazonaws.com/bk-cl-demo.menu.app/wp-media-folder-burger-king-chile//home/ubuntu/wordpress/web/app/uploads/sites/13/2021/10/Burger-King-Main.png",
      },

      {
        id: 20,
        nombre: "UTEM, Campus Macul",
        coords: { lat: -33.466429, lng: -70.5985579 },
        icon: "school",
      },
    ];

    const initMap = () => {
      const coords = { lat: -33.466429, lng: -70.5985579 };

      const mapStyles = [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
      ];

      // Inicializar el mapa y guardarlo en el ref para que esté disponible en otras funciones
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        center: coords,
        styles: mapStyles,
      });

      // Añadir marcadores de los locales
      locales.forEach((loc) => {
        const marker = new window.google.maps.Marker({
          position: loc.coords,
          map: mapInstanceRef.current,
          icon: {
            url: loc.icon,
            scaledSize: new window.google.maps.Size(26, 26),
          },
        });

        // Crear una instancia de InfoWindow para cada marcador
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="
              padding: 10px;
              font-size: 14px;
              color: ${theme === 'dark' ? '#fff' : '#000'};
              background-color: ${theme === 'dark' ? '#333' : '#fff'};
              border-radius: 5px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            ">
              <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: bold;">${loc.nombre}</h3>
            </div>
          `,
        });

        // Añadir un evento al marcador para abrir el InfoWindow al hacer clic
        marker.addListener("click", () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      });

      // Añadir marcador para la ubicación del usuario
      addUserLocation();
    };

    const addUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            if (userMarkerRef.current) {
              // Si el marcador ya existe, actualizar su posición
              userMarkerRef.current.setPosition(userCoords);
            } else {
              // Crear el marcador si aún no existe
              userMarkerRef.current = new window.google.maps.Marker({
                position: userCoords,
                map: mapInstanceRef.current,
                title: "Tu ubicación", // Añadir título al marcador
              });
            }

            mapInstanceRef.current.setCenter(userCoords);
            mapInstanceRef.current.setZoom(14);
          },
          (error) => {
            console.error("Error al obtener la ubicación del usuario", error);
          },
          {
            enableHighAccuracy: true,
          }
        );
      } else {
        console.error("La geolocalización no es compatible con este navegador.");
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps API no está cargado.");
    }
  }, [theme]); // Dependencia en el tema para recargar los estilos

  return <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

export default Ubicacion;
