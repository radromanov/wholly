import "module-alias/register";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { GatewayServiceConfig } from "@shared/config";

const gatewayConfig = new GatewayServiceConfig();
const { port, env } = gatewayConfig.get();

const app = express();

const services = {
  auth: "http://localhost:8001",
  todos: "http://localhost:8002",
};

app.use("/", (req, res, next) => {
  console.log("in gateway");
  next();
});

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

app.listen(port, () =>
  console.log(`API Gateway running on port ${port} in ${env} mode.`)
);
