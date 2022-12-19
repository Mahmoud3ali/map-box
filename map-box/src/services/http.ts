import axios, { AxiosInstance } from "axios";

const serverPort = process.env.REACT_APP_API_URL || 7123;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://127.0.0.1:${serverPort}/`,
});

const init = (callback: (axios: AxiosInstance) => void) => {
  callback(axiosInstance);
};

const setJwt = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const defaultHandleForNonHttpError = (error: unknown) => {
  console.error(error);
};

const http = {
  init,
  setJwt,
  defaultHandleForNonHttpError,
  isHttpError: axios.isAxiosError,
  request: axiosInstance.request,
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  delete: axiosInstance.delete,
};

export default http;
