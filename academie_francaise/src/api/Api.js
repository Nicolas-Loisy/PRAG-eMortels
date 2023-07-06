import axios from "axios";

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

 /** FONCTIONS GENERIQUE */

  async get(url) {
    try {
      const response = await axios.get(`${this.baseUrl}${url}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async post(url, body) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.post(`${this.baseUrl}${url}`, body, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async put(url, body) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.put(`${this.baseUrl}${url}`, body, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(url) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.delete(`${this.baseUrl}${url}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /** END FONCTIONS GENERIQUE */


  /**
   * GET /categories : Récupère la liste des catégories disponibles 
   */
  async getCategories() {
    try {
      return await this.get(`/categories`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /sousCategories/:categorie : Récupère les sous-catégories d'une catégorie spécifique 
   */
  async getSousCategories(categorie) {
    try {
      return await this.get(`/sousCategories/${categorie}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /niveaux_types_exo/:categorie/:sousCategorie : Récupère les niveaux et les types des exercices d'une catégorie et d'une sous-catégorie spécifiques 
   */
  async getNiveauxTypesExo(categorie, sousCategorie) {
    try {
      return await this.get(`/niveaux_types_exo/${categorie}/${sousCategorie}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /exercices/:categorie/:sousCategorie/:niveau : Récupère les exercices d'une catégorie, d'une sous-catégorie et d'un niveau spécifiques 
   */
  async getExercices(categorie, sousCategorie, niveau) {
    try {
      return await this.get(`/exercices/${categorie}/${sousCategorie}/${niveau}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /exercice/:categorie/:sousCategorie/:niveau/:exerciceId : Récupère un exercice en fonction d'une catégorie, d'une sous-catégorie, d'un niveau et de l'id de l'exercice 
   */
  async getExercice(categorie, sousCategorie, niveau, exerciceId) {
    try {
      return await this.get(`/exercice/${categorie}/${sousCategorie}/${niveau}/${exerciceId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /niveaux 
   */
  async getAllNiveaux() {
    try {
      return await this.get(`/niveaux`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /exercices/:nbExercice 
   */
  async getNbExercice(nbExercice) {
    try {
      return await this.get(`/exercices/${nbExercice}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /questions/:nbQuestions
   */
  async getNbQuestions(nbQuestions) {
    try {
      return await this.get(`/questions/${nbQuestions}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * GET /questions/:niveau/:nbQuestions
   */
  async getNbQuestionsNiveau(niveau, nbQuestions) {
    try {
      return await this.get(`/questions/${niveau}/${nbQuestions}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const api = new Api("http://localhost:3000/api");