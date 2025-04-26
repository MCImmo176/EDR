import os
import sys
from datetime import datetime

# Obtenir le chemin du dossier où se trouve le script
script_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
if script_dir == '':
    script_dir = os.getcwd()

print(f"Analyse du dossier: {script_dir}")

# Obtenir la liste de tous les fichiers dans le dossier du script
files = [f for f in os.listdir(script_dir) if os.path.isfile(os.path.join(script_dir, f))]

# Créer un nom de fichier de sortie avec horodatage
current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
output_filename = f"liste_fichiers_{current_time}.txt"
output_path = os.path.join(script_dir, output_filename)

# Créer le fichier texte dans le même dossier
with open(output_path, 'w', encoding='utf-8') as txt_file:
    txt_file.write(f"Liste des fichiers dans {script_dir}:\n\n")
    for i, file in enumerate(files, 1):
        txt_file.write(f"{i}. {file}\n")

print(f"Liste des fichiers exportée dans: {output_filename}")