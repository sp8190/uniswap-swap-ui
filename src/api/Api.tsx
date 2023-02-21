import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const getCoinPrice = (coinId: string) =>
  api
    .get(`/simple/price?vs_currencies=USD&ids=${coinId}`)
    .then((res) => res.data);

export const getCoinList = () => api.get(`/coins/list`).then((res) => res.data);
