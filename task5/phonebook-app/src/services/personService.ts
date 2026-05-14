// =============================================================================
//  personService — Axios-based CRUD operations against json-server.
//  Endpoints proxied: /api/persons → http://localhost:3001/persons
//  Signed: by Abdulmoin Hablas
// =============================================================================

import axios from 'axios';
import type { Person, NewPerson } from '../types';

const BASE_URL = '/api/persons';

const getAll = async (): Promise<Person[]> => {
  const response = await axios.get<Person[]>(BASE_URL);
  return response.data;
};

const create = async (newPerson: NewPerson): Promise<Person> => {
  const response = await axios.post<Person>(BASE_URL, newPerson);
  return response.data;
};

const update = async (id: string, updatedPerson: NewPerson): Promise<Person> => {
  const response = await axios.put<Person>(`${BASE_URL}/${id}`, updatedPerson);
  return response.data;
};

const remove = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export default { getAll, create, update, remove };