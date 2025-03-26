import { api } from './api';

export class SignagePriceService {
  calcPrice(formData, onUploadProgress) {
    return api.post("/signage/calcPrices",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Добавьте другие заголовки, если требуется
            // 'Authorization': 'Bearer your_token_here'
          },
          onUploadProgress
    });
  }


  getPrices() {
    return api.get("/signage/getPrices");
  }
}
