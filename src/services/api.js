import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon/",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

});
export default api;
