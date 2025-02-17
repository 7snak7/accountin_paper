import axios from "axios";

const baseURl = "http://localhost:8075/api";

const api = axios.create({baseURL: baseURl + "/",});

api.defaults.timeout = 15000;


export { api };
