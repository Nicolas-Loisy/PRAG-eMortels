import openpyxl
import csv 

fichier = openpyxl.load_workbook('data_excel/donnees_niveau_1.xlsx')

feuille = classeur.active

for ligne in feuille.iter.rows(values_only=True) :
    for valeur in ligne :
        print(valeur)

