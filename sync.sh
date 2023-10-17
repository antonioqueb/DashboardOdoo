#!/bin/bash

local_dir="/mnt/c/Users/anton/OneDrive/Escritorio/TobaccoMetricsPro/"
remote_dir="antonioqueb@192.168.1.71:/home/antonioqueb/odoo/addons/"

inotifywait -m -r -e modify,create,delete --format '%w%f' "$local_dir" | while read file
do
    # Copiar el archivo modificado usando SCP
    scp "$file" "$remote_dir"
    echo "Archivo $file ha sido sincronizado."
done
