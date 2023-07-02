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
}

export const api = new Api("http://localhost:3000/api");