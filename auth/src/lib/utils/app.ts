import { Application } from "@core/application";
import express from "./express";

const app = new Application(express);
const endpoints = app.routes();

export { app, endpoints };
