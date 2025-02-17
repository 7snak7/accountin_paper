import { api } from './api';

export class ResponsiblePersonService {
  static allPersons = () => {
    return api.get("/allPersons");
  }
}
