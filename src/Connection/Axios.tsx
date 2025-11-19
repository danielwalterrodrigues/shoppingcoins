import axios from 'axios';

//export const backendUrl = 'http://192.168.15.6:3000/'
export const backendUrl = 'https://shoppingcoins-api.vercel.app/'

const api = axios.create({
  baseURL: backendUrl, 
});

export default api;

