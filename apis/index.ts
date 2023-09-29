import axios, { AxiosInstance } from "axios";

export interface IApi extends AxiosInstance {
  setToken?: (tokenType?: string, accessToken?: string) => void;
  common: AxiosInstance;
}

export const api: IApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
}) as IApi;

export const commonApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

api.common = commonApi;

api.setToken = function setToken(
  tokenType?: string,
  accessToken?: string,
): void {
  if (accessToken) {
    api.defaults.headers.common.authorization = `${tokenType} ${accessToken}`;
  } else {
    delete api.defaults.headers.common.authorization;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const tokens = JSON.parse(localStorage.getItem("token") || "{}");
      if (tokens?.tokenType && tokens?.accessToken) {
        config.headers.authorization = `${tokens.tokenType} ${tokens.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
