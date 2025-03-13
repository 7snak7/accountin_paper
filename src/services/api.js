import axios from "axios";

const baseURl = "http://147.45.161.250:8075";

const api = axios.create({baseURL: baseURl + "/",});

api.defaults.timeout = 15000;


export { api };
