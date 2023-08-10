# Establecer la imagen base (Node.js LTS, por ejemplo)
FROM node:lts-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al directorio de trabajo
COPY package*.json ./
COPY . .

# Instalar las dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación React
EXPOSE 3000

# Comando para ejecutar la aplicación en modo de producción
CMD ["npm", "start"]
