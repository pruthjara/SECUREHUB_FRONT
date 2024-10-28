#!/bin/bash

# Nombre de la imagen
REPO_BACKEND="strast-upm/securehub_backend"
TAG="latest"
USERNAME="pruthjara"
TOKEN="-"

# Función para ejecutar un comando y verificar errores
run_command() {
  command=$1
  error_message=$2

  if ! eval "$command"; then
    echo "Error: $error_message"
    exit 1
  fi
}

# Función para eliminar las imágenes locales antiguas del backend
remove_old_local_backend_image() {
  images_to_remove=(
    "securehub-backend:latest"
    "ghcr.io/strast-upm/securehub_backend:latest"
  )

  for image in "${images_to_remove[@]}"; do
    echo "Eliminando imagen local $image..."
    remove_command="docker rmi -f $image"
    run_command "$remove_command" "Error al eliminar la imagen local $image"
  done
}

# Función principal del backend
main_backend() {
  compose_file_path=$1

  # Verificar que USERNAME y TOKEN estén definidos
  if [[ -z "$USERNAME" || -z "$TOKEN" ]]; then
    echo "Error: Las variables de entorno 'USERNAME' y 'TOKEN' deben estar definidas."
    exit 1
  fi

  # Eliminar las imágenes locales del backend antes de reconstruir
  remove_old_local_backend_image

  # Construir la imagen del backend
  echo "Construyendo la imagen Docker del backend con Docker Compose desde $compose_file_path..."
  build_command="docker-compose -f $compose_file_path build backend --no-cache"
  run_command "$build_command" "Error al construir la imagen del backend con Docker Compose"

  # Obtener el ID de la imagen del backend recién construida
  backend_image_id=$(docker images -q "securehub-backend")

  if [[ -z "$backend_image_id" ]]; then
    echo "Error: No se pudo encontrar la imagen del backend después de la construcción."
    exit 1
  fi

  # Etiquetar la imagen del backend para GitHub Container Registry
  echo "Etiquetando la imagen del backend..."
  tag_backend_command="docker tag $backend_image_id ghcr.io/$REPO_BACKEND:$TAG"
  run_command "$tag_backend_command" "Error al etiquetar la imagen del backend"

  # Autenticarse en GitHub Container Registry
  echo "Autenticándose en GitHub Container Registry..."
  login_command="echo $TOKEN | docker login ghcr.io -u $USERNAME --password-stdin"
  run_command "$login_command" "Error al autenticar en GitHub Container Registry"

  # Subir la imagen del backend al registro
  echo "Subiendo la imagen del backend al registro de GitHub..."
  push_backend_command="docker push ghcr.io/$REPO_BACKEND:$TAG"
  run_command "$push_backend_command" "Error al subir la imagen del backend al registro de GitHub"

  echo "¡Imagen Docker del backend subida exitosamente!"
}

# Verificar que se haya pasado el archivo de Docker Compose como argumento
if [[ $# -ne 1 ]]; then
  echo "Uso: $0 <ruta_del_docker_compose>"
  exit 1
fi

compose_file_path=$1
main_backend "$compose_file_path"
