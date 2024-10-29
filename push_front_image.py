import subprocess
import os
import sys

# Configuración para la imagen del frontend
REPO_FRONTEND = "strast-upm/securehub_frontend"
TAG = "latest"
USERNAME = "pruthjara"
TOKEN = "-"

def run_command(command, error_message):
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {error_message}\nDetalles del error: {e}")
        sys.exit(1)

#def remove_old_local_frontend_image():
    # Imágenes antiguas del frontend a eliminar
 #   images_to_remove = [
 #       "securehub-frontend:latest",
 #       "ghcr.io/strast-upm/securehub_frontend:latest"
 #   ]
    
 #   for image in images_to_remove:
 #       print(f"Eliminando imagen local {image}...")
 #       remove_command = f"docker rmi -f {image}"
 #       run_command(remove_command, f"Error al eliminar la imagen local {image}")

def get_image_id(image_name):
    result = subprocess.run(
        f"docker images -q {image_name}",
        shell=True,
        check=True,
        stdout=subprocess.PIPE,
        universal_newlines=True
    )
    return result.stdout.strip()

def main(compose_file_path):
    # Verificar que USERNAME y TOKEN estén definidos
    if not USERNAME or not TOKEN:
        print("Error: Las variables de entorno 'GITHUB_USERNAME' y 'GITHUB_TOKEN' deben estar definidas.")
        sys.exit(1)

    # Eliminar las imágenes locales antes de reconstruir
  #  remove_old_local_frontend_image()

    # Construir la imagen con Docker Compose sin caché
    print(f"Construyendo la imagen Docker del frontend con Docker Compose desde {compose_file_path}...")
    build_command = f"docker-compose -f {compose_file_path} build --no-cache"
    run_command(build_command, "Error al construir la imagen del frontend con Docker Compose")

    # Obtener el ID de la imagen recién construida
    frontend_image_id = get_image_id("securehub_front-frontend")

    if not frontend_image_id:
        print("Error: No se pudo encontrar la imagen del frontend después de la construcción.")
        sys.exit(1)

    # Etiquetar la imagen para GitHub Container Registry
    print("Etiquetando la imagen del frontend...")
    tag_frontend_command = f"docker tag {frontend_image_id} ghcr.io/{REPO_FRONTEND}:{TAG}"
    run_command(tag_frontend_command, "Error al etiquetar la imagen del frontend")

    # Autenticarse en GitHub Container Registry
    print("Autenticándose en GitHub Container Registry...")
    login_command = f"echo {TOKEN} | docker login ghcr.io -u {USERNAME} --password-stdin"
    run_command(login_command, "Error al autenticar en GitHub Container Registry")

    # Subir la imagen al registro
    print("Subiendo la imagen del frontend al registro de GitHub...")
    push_frontend_command = f"docker push ghcr.io/{REPO_FRONTEND}:{TAG}"
    run_command(push_frontend_command, "Error al subir la imagen del frontend al registro de GitHub")

    print("¡Imagen del frontend subida exitosamente!")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python DockerImagePushFrontend.py <ruta_del_docker_compose>")
        sys.exit(1)

    compose_file_path = sys.argv[1]
    main(compose_file_path)
