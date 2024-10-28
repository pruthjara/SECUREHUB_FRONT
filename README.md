# SecureHub_Front Repository

Este repositorio contiene los archivos necesarios para el despliegue del **frontend** de la aplicación SecureHub en un entorno Docker y Kubernetes. 

## Estructura de Archivos

- **frontend/**  
  Carpeta que contiene el código fuente del frontend de SecureHub.

- **.gitignore**  
  Archivo de configuración que especifica qué archivos y carpetas deben ser ignorados por Git, evitando que archivos temporales o de configuración local sean subidos al repositorio.

- **Dockerfile**  
  Archivo Docker que define la configuración para construir la imagen del frontend de SecureHub. Prepara el frontend para ejecutarse en un contenedor Docker.

- **deploy_frontend.sh**  
  Script de despliegue para el frontend, que automatiza el proceso de construcción, etiquetado y push de la imagen del frontend a un registro de contenedores.

- **docker-compose-front.yaml**  
  Archivo de configuración de Docker Compose para el frontend. Permite construir y ejecutar el contenedor del frontend de SecureHub de forma aislada o en conjunto con otros servicios.

## Instrucciones para el Despliegue del Frontend

1. **Construcción de la Imagen Docker**: Utiliza el archivo `Dockerfile` para construir la imagen del frontend, configurada para optimizar la aplicación en un entorno de producción Docker.
2. **Despliegue con Docker Compose**:
   - Usa `docker-compose-front.yaml` para construir y ejecutar el contenedor del frontend de SecureHub. Este archivo facilita la configuración de red y variables de entorno necesarias para el frontend.
3. **Script de Despliegue del Frontend**: Ejecuta `deploy_frontend.sh` para automatizar el proceso de construcción y despliegue de la imagen en un registro de contenedores.

Este repositorio está diseñado para facilitar el despliegue del frontend de SecureHub en entornos Docker y Kubernetes, permitiendo una configuración modular y lista para producción.
