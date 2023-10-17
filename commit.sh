#!/bin/bash

while true; do
    # Agregar todos los cambios
    git add .

    # Obtener la fecha en el formato solicitado: semana del mes, mes, año, hora exacta
    SEMANA=$(date '+%U')
    MES=$(date '+%B')
    ANO=$(date '+%Y')
    HORA=$(date '+%H:%M:%S')

    # Construir el mensaje de commit con la fecha
    MSG_COMMIT="Desarrollo de la semana #$SEMANA de producción de TobaccoMetricsPro -  $HORA"

    # Realizar el commit
    git commit -m "$MSG_COMMIT"

    # Subir los cambios al repositorio remoto en la rama "main"
    git push

    # Esperar 60 segundos antes de la próxima iteración parta evitar sobrecargar el servidor
    sleep 60
done
