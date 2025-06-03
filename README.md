# SecureHub_Front Repository

Este repositorio contiene los archivos necesarios para el despliegue del **frontend** de la aplicación SecureHub en entornos Docker y Kubernetes.

## Estructura de Archivos

- **frontend/**  
  Carpeta que contiene el código fuente del frontend de SecureHub, desarrollado utilizando tecnologías web modernas como React, HTML, CSS y JavaScript.

- **.gitignore**  
  Archivo de configuración que especifica qué archivos y carpetas deben ser ignorados por Git, evitando que archivos temporales o de configuración local sean subidos al repositorio.

- **Dockerfile**  
  Archivo Docker que define la configuración para construir la imagen del frontend de SecureHub. Prepara el frontend para ejecutarse en un contenedor Docker.

- **push_front_image.py**  
  Script en Python que automatiza la construcción y subida de la imagen Docker del frontend a un registro de contenedores.

- **LICENSE**  
  Archivo que contiene la licencia del proyecto.

- **README.md**  
  Este documento con información sobre el despliegue del frontend de SecureHub.

## Instrucciones para el Despliegue del Frontend

1. **Construcción de la Imagen Docker**  
   Utiliza el archivo `Dockerfile` para construir la imagen del frontend. Este archivo está configurado para optimizar la aplicación en un entorno de producción Docker.

2. **Automatizar la Construcción y Subida de la Imagen**  
   Ejecuta el script `push_front_image.py` para automatizar el proceso de construcción y subida de la imagen del frontend a tu registro de contenedores.

---

Este repositorio está diseñado para facilitar el despliegue del frontend de SecureHub en entornos Docker y Kubernetes, permitiendo una configuración modular y lista para producción.

