#!/bin/bash

# Directorio donde se encuentra tu repositorio Git
REPO_DIR="$(dirname "$0")"

while true; do
    # Cambia al directorio del repositorio
    cd "$REPO_DIR"

    # Ejecuta git pull
    git pull

    # Espera 30 segundos antes de la próxima ejecución
    sleep 9
done
