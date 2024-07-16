import express from "express";

const app = express();

console.log("Testing if husky config works");

app.listen(3001, () =>
  console.log(`Auth Microservice running on port ${3001}`),
);
