import { config } from "dotenv";
import { resolve } from "path";

const envPath = resolve(__dirname, "../../../../.env");

console.log(envPath);

config({
  path: envPath,
});
