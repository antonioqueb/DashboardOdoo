#!/bin/bash

while true; do
    # Agregar todos los cambios
    git add .

    # Obtener la fecha en el formato solicitado: semana del mes, mes, año, hora exacta
    SEMANA=$(date '+%U')
    MES=$(date '+%B')
    AÑO=$(date '+%Y')
    HORA=$(date '+%H:%M:%S')

    # Construir el mensaje de commit
    MSG_COMMIT="Desarrollo de la semana #$SEMANA de producción de TobaccoMetricsPro -  $HORA"

    # Realizar el commit
    git commit -m "$MSG_COMMIT"

    # Subir los cambios al repositorio remoto en la rama "main"
    git push origin main  # Asegúrate de ajustar "origin" y "main" según tu configuración

    # Esperar 60 segundos antes de la próxima iteración
    sleep 60
done
