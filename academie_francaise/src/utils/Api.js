import data from "../ressources/bdd_exo.json";

export function getListeCategories() {
  const categories = data.categories;

  const listeCategories = Object.keys(categories).map((categorieId) => {
    const categorie = categories[categorieId];
    const sousCategories = categorie.sousCategories;

    const listeSousCategories = Object.keys(sousCategories).map(
      (sousCategorieId) => sousCategories[sousCategorieId].nom
    );

    return {
      nom: categorie.nom,
      sousCategories: listeSousCategories,
    };
  });

  return listeCategories;
}

export function getCategorieById(categorieId) {
  return data.categories[categorieId];
}

export function getSousCategorieById(categorieId, sousCategorieId) {
  return data.categories[categorieId].sousCategories[sousCategorieId];
}

export function getNiveauById(categorieId, sousCategorieId, niveauId) {
  return data.categories[categorieId].sousCategories[sousCategorieId].niveaux[niveauId];
}

export function getExerciceById(categorieId, sousCategorieId, niveauId, exerciceId) {
  return data.categories[categorieId].sousCategories[sousCategorieId].niveaux[niveauId].exercices[exerciceId];
}
