# Frontend Descuentos

## Archivo .env

Modifiqué el archivo `App.js` para que al hacer la llamada a un URL, se obtenga de una variable de entorno. Para generear esta se debe crear un archivo `.env` en el directorio raiz del proyecto, de la siguiente forma:

```
REACT_APP_URL_BACK="http://localhost:8080"
```

Luego el codigo concatena esta variable con `/descuentos`. Para producción se usa el URL `https://api-descuentos.tssw.info`.

- Gerardo Araneda

## Se actualizo el frontend de la celula descuentos siguiendo el estilo que tiene la celula de práctica

El diseño esta hecho con tailwind CSS

Para poder usarlo se debe de tener node.js https://nodejs.org/en/download/prebuilt-installer

Ejecutar "npm install" para instalar dependecias

Para la parte algunos iconos se utilizo lucid-react, por lo que se debe instalar a traves de la terminal si es que no esta "npm install lucide-react"


Ejecutar "npm install" para instalar dependencias

Ejecutar "npm install react-leaflet leaflet" para la ubicación

Ejecutar "pip install requests" para solicitudes HTTP

Ejecutar "pip install beautifulsoup4" para web scraping

Ejecutar "npm install react-modal" para para usar modal

Ejecutar "npm install axios" ¡Importante!

Ejecutar "npm install uuid" para evitar errores de id de los productos

Ejecutar "npm install react-slider" para usar el rango de precios

Ejecutar "npm install js-cookie" para la autenticacion


Ejecutar con "npm start"


NOTA:
Para que los productos sean mostrados se debe ejecutar el backend del repositorio back-descuentos 