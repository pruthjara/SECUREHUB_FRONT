# Utiliza una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json desde la carpeta /frontend
COPY ./frontend/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente de la carpeta /frontend
COPY ./frontend ./

# Compilar la aplicación de React
RUN npm run build

# Instalar el servidor HTTP para servir la aplicación (por ejemplo, serve)
RUN npm install -g serve

# Exponer el puerto 3000 (el puerto predeterminado de la aplicación React)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "build"]

