import axios from "axios";
import { authConfig } from "./config";

const { EMAIL_SERVICE_HOST, EMAIL_SERVICE_PORT } = authConfig.get();

export const emailApi = axios.create({
  baseURL: `${EMAIL_SERVICE_HOST}:${EMAIL_SERVICE_PORT}`,
});
