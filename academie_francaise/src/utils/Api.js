import data from "../ressources/bdd_exo.json";

export const categories = data.categories.map((categorie) => ({
  id: categorie._id,
  nom: categorie.nom,
  sousCategories: categorie.sousCategories.map((sousCategorie) => ({
    id: sousCategorie._id,
    nom: sousCategorie.nom,
  })),
}));

export function getCategorieById(categorieId) {
  const categorie = data.categories.find((cat) => cat._id === categorieId);
  return categorie || null;
}

export function getSousCategorieById(categorieId, sousCategorieId) {
  const categorie = getCategorieById(categorieId);
  if (categorie) {
    const sousCategorie = categorie.sousCategories.find(
      (sousCat) => sousCat._id === sousCategorieId
    );
    return sousCategorie || null;
  }
  return null;
}

export function getNiveauById(categorieId, sousCategorieId, niveauId) {
  const sousCategorie = getSousCategorieById(categorieId, sousCategorieId);
  if (sousCategorie) {
    const niveau = sousCategorie.niveaux.find((niv) => niv._id == niveauId);
    return niveau || null;
  }
  return null;
}

export function getExerciceById(categorieId, sousCategorieId, niveauId, exerciceId) {
  const niveau = getNiveauById(categorieId, sousCategorieId, niveauId);
  if (niveau) {
    const exercice = niveau.exercices.find((exo) => exo._id == exerciceId);
    return exercice || null;
  }
  return null;
}
