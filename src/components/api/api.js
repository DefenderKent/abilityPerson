import * as axios from "axios";

const instanceAxios = axios.create({
  baseURL: `http://localhost:3001/person/`
});
export const personAPI = {
  getPersons(id) {
    return instanceAxios.get(id);
  },
  getPerson(id) {
    return instanceAxios.get(id);
  }
};
