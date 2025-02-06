import axios from "axios";

const URL_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://apicozy.rlstudio.my.id";

export default axios.create({
  baseURL: URL_API,
});
