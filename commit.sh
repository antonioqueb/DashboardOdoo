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

    # Esperar 45 segundos antes de la próxima iteración
    sleep 45
done
