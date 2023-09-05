import axios from "axios";
export const axiosInstace = axios.create({
  baseURL: "https://misty-puce-hedgehog.cyclic.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosPrivateInstance = axios.create({
  baseURL: "https://misty-puce-hedgehog.cyclic.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosPrivateImageInstance = axios.create({
  baseURL: "https://misty-puce-hedgehog.cyclic.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
