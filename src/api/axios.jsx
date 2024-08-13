import axios from "axios";
// const BASE_URL = "http://localhost:3500";
// const BASE_URL = "https://spctmo-server.onrender.com";
// const BASE_URL = "https://kapitolyo-api-server.onrender.com";
// const BASE_URL = "https://kapitolyo-api-server-1.onrender.com";
const BASE_URL = "https://kapitolyo-api-server-2.onrender.com";


export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
