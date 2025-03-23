import { api } from './api';

export class SignagePriceService {
  calcPrice(item) {
    return api.post("/signage/calcPrices", item, {});
  }

  getPrices() {
    return api.get("/signage/getPrices");
  }
}
