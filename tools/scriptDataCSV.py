import pandas as pd
import csv
import re

fichier = "tools/data_excel/donnees_niveau_1.xlsx"

df = pd.read_excel(fichier)
# print(df.columns.tolist())

# print(df['Corrige'].values)

# writer = pd.ExcelWriter(
#     "tools/data_excel/donnees_niveau_1.xlsx", engine='xlsxwriter')
# workbook = writer.book
# bold_format = workbook.__format__({'bold': True})


# def checkformat (value){
#     if value match
# }

# for i, row in df['Corrige'].values:
#     for j, val in enumerate(row):
#         if val=='E5': worksheet.write(i, j, val, header_format)
#         else: worksheet.write(i, j, val)


mot_en_gras = df['Corrige'].str.extractall(r'(\b\w+\b)')[0]
print(mot_en_gras)

# df['Corrigé'] = df['Corrigé'].apply(
#     lambda cellule: cellule if est_en_gras(cellule) else "")

# nouveau_fichier = "tools/data_excel/donnees_niveau_1.xlsx"
# df.to_excel(nouveau_fichier, index=False)
