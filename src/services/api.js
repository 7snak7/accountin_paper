import axios from "axios";

const baseURl = "https://api.mpp-lestnica.ru/";

const api = axios.create({baseURL: baseURl + "/",});

api.defaults.timeout = 15000;

export { api };
