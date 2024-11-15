# Etapa 1: Construcción de la aplicación React
FROM node:14-alpine as build

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

# Exponer el puerto en el que React servirá la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar servidor
CMD ["npm", "start"]
