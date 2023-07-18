# Imagen base con Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json /app/


# Copiar el resto de los archivos del proyecto
COPY . /app

# Puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
