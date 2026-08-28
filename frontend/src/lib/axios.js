import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/notes":
      "https://note-nest-alpha.vercel.app/notes";

const api = axios.create({ baseURL });

export default api;
