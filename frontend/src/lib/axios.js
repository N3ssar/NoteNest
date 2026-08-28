import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/notes"
    : "/api/notes";

const api = axios.create({ baseURL });

export default api;
