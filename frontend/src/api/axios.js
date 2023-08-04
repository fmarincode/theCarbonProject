import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true, // Add this line to enable sending credentials with requests
});
