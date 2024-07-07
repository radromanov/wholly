import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const services = {
  auth: "http://localhost:8001",
  todos: "http://localhost:8002",
};

Object.keys(services).forEach((service) => {
  app.use(
    `/api/${service}`,
    createProxyMiddleware({
      target: services[service as keyof typeof services],
      changeOrigin: true,
      pathRewrite: { [`^/api/${service}`]: `/${service}` },
    })
  );
});

app.listen(8000, () => console.log(`API Gateway running on port 8000`));
