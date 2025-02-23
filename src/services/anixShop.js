import { api } from './api';

export class AnixShopService {
  static anixShops = () => {
    return api.get("/anixShops?size=200");
  }
}
