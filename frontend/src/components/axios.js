import axios from "axios";

//The current backend is listening in the port 9000
const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export default instance;
