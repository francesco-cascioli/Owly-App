import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'https://openlibrary.org';

export async function fetchBooksByCategory(category) {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${category}.json`);
    return response.data.works;
  } catch (error) {
    console.error('Errore nel recupero dei libri:', error);
    return [];
  }
}

export async function fetchBookDetails(bookKey) {
  try {
    const response = await axios.get(`${BASE_URL}${bookKey}.json`);
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero della descrizione:', error);
    return { description: 'Descrizione non disponibile.' };
  }
}
