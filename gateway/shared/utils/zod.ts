import z from "zod";

export const required = (name = "String") =>
  z.string({ required_error: `${name} is required` });
export const minimum = (name = "String", min = 1) =>
  `${name} must be at least ${min} characters`;
