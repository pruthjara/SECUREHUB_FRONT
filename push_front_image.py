import subprocess
import sys
import os

# Configuración
REPO_FRONTEND = "strast-upm/securehub_frontend"
TAG = "latest"
USERNAME = "pruthjara"
TOKEN = "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"

def run_command(command, error_message):
    """Ejecuta un comando y maneja errores."""
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {error_message}\nDetalles del error: {e}")
        sys.exit(1)

def remove_old_local_frontend_image():
    """Elimina imágenes antiguas del frontend."""
    images_to_remove = [
        "securehub-frontend:latest",
        "ghcr.io/strast-upm/securehub_frontend:latest"
    ]
    for image in images_to_remove:
        print(f"Eliminando imagen local {image}...")
        run_command(f"docker rmi -f {image}", f"Error al eliminar la imagen local {image}")

def get_image_id(image_name):
    """Obtiene el ID de una imagen especificada."""
    result = subprocess.run(f"docker images -q {image_name}", shell=True, check=True, stdout=subprocess.PIPE, universal_newlines=True)
    return result.stdout.strip()

def main():
    # Verificar que USERNAME y TOKEN estén definidos
    if not USERNAME or not TOKEN:
        print("Error: Las variables de entorno 'USERNAME' y 'TOKEN' deben estar definidas.")
        sys.exit(1)

    # Eliminar la imagen local del frontend antes de reconstruir
    remove_old_local_frontend_image()

    # Construir la imagen Docker directamente
    print("Construyendo la imagen Docker del frontend...")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    run_command(f"docker build -t securehub-frontend:latest -f {os.path.join(current_dir, 'Dockerfile')} {current_dir}", "Error al construir la imagen Docker del frontend")

    # Obtener el ID de la imagen del frontend
    frontend_image_id = get_image_id("securehub-frontend")

    if not frontend_image_id:
        print("Error: No se pudo encontrar la imagen del frontend después de la construcción.")
        sys.exit(1)

    # Etiquetar la imagen del frontend para GitHub Container Registry
    print("Etiquetando la imagen del frontend...")
    run_command(f"docker tag {frontend_image_id} ghcr.io/{REPO_FRONTEND}:{TAG}", "Error al etiquetar la imagen del frontend")

    # Autenticarse en GitHub Container Registry
    print("Autenticándose en GitHub Container Registry...")
    run_command(f"echo {TOKEN} | docker login ghcr.io -u {USERNAME} --password-stdin", "Error al autenticar en GitHub Container Registry")

    # Subir la imagen del frontend al registro
    print("Subiendo la imagen del frontend al registro de GitHub...")
    run_command(f"docker push ghcr.io/{REPO_FRONTEND}:{TAG}", "Error al subir la imagen del frontend al registro de GitHub")

    print("¡Imagen del frontend subida exitosamente!")

if __name__ == "__main__":
    main()

