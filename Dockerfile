# Etapa 1: Construcción de la aplicación React
FROM node:20-alpine as build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias necesarias
RUN npm install

# Instalar dependencias adicionales
RUN npm install axios uuid react-leaflet leaflet react-modal react-slider

# Copiar el resto del código del proyecto
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
