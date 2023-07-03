import pandas as pd
import openpyxl

# Spécifiez le chemin d'accès au fichier Excel
fichier = "tools/data_excel/donnees_niveau_1.xlsx"

# Charger le fichier Excel en utilisant openpyxl
wb = openpyxl.load_workbook(fichier)

# Récupérer la première feuille de calcul
nom_feuille = wb.sheetnames[0]
feuille = wb['liste_exercices']

# Charger les données du fichier Excel en utilisant pandas
df = pd.read_excel(fichier)

colonne = 'C'
for i, valeur in enumerate(df[colonne], start=1):
    # Récupérer la cellule correspondante dans le fichier Excel
    cellule = feuille[colonne]

    # Vérifier si la cellule est mise en forme en gras
    est_en_gras = cellule.font.bold

    # Afficher le résultat
    print("Cellule {}: {}".format(i, valeur))
    print("Est en gras:", est_en_gras)
    print()
