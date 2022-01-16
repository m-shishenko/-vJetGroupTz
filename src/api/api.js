import axios from "axios";

const request = axios.create({
  baseURL: "https://cinema-api-test.y-media.io/v1",
});

export default request;
