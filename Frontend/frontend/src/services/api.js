import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

// helper for image upload to backend
export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await api.post("/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // expected { url: 'https://...' }
}

export default api;
