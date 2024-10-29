# SecureHub_Front

Frontend del proyecto **SecureHub** creado con [Create React App](https://create-react-app.dev/). Este frontend se comunica con el backend de la aplicación y proporciona una interfaz de usuario para la gestión de seguridad de personal.

## Estructura del Proyecto

```bash
/frontend/
├── public                # Archivos públicos y estáticos
├── src                   # Código fuente del frontend
│   ├── components        # Componentes de React
│   ├── services          # Servicios para llamadas a la API
│   ├── App.js            # Componente principal de la aplicación
│   ├── index.js          # Punto de entrada de la aplicación
├── package.json          # Configuración de dependencias y scripts
└── README.md             # Documentación del proyecto
```

## Requisitos Previos

- **Node.js** 14 o superior
- **npm** 6 o superior

## Instrucciones de Uso

### Clonar el Repositorio

```bash
git clone https://github.com/STRAST-UPM/SysControl_Front.git
cd SysControl_Front/frontend
```

### Configurar Entorno de Desarrollo

Antes de iniciar el proyecto, asegúrate de configurar correctamente la URL del backend en el archivo de configuración. Usa la variable de entorno `REACT_APP_BACKEND_URL` para definir la URL del backend.

### Ejecutar el Proyecto en Local

Para iniciar el frontend en modo de desarrollo, ejecuta:

```bash
npm start
```
La aplicación estará disponible en http://localhost:3000. La página se recargará automáticamente si realizas cambios en el código.

### Crear un Build para Producción

Para compilar el proyecto para producción, ejecuta:
```bash
npm run build
```
Este comando genera una versión optimizada de la aplicación en la carpeta build, lista para ser desplegada.

### Documentación de la API

La aplicación se comunica con el backend mediante una API REST. Asegúrate de configurar la URL del backend correctamente para el despliegue.

### Pruebas

Para ejecutar las pruebas en modo interactivo:
```bash
npm test
```
Consulta la sección de ejecución de pruebas en la documentación de Create React App para más información.

### Despliegue en Producción

El frontend se puede desplegar en un clúster de Kubernetes. Después de descargar el proyecto, asegúrate de ejecutar el siguiente comando para generar la carpeta `build`:
```bash
npm run build
```

Configura las variables de entorno necesarias para conectar con el backend correctamente antes de desplegar.


