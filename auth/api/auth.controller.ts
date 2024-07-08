import { AuthServiceConfig } from "@shared/config";
import { Request, Response } from "express";

export class AuthController {
  constructor(private readonly config: AuthServiceConfig) {}

  handleRegister = async (req: Request, res: Response) => {
    console.log(req.body);

    const event = this.config.get("event");

    console.log("Fire event", event.USER_REGISTER);

    res.sendStatus(201);
    // process request payload
    // some auth.service call
    // send otp to user
  };

  handleLogin = async (req: Request, res: Response) => {
    // process request payload
    // some auth.service call
    // send otp to user
  };

  handleLogout = async (req: Request, res: Response) => {
    // process request payload
    // some auth.service call
    // destroy the cookie
    //
  };

  handleVerify = async (req: Request, res: Response) => {
    // GET
    // if (req.method === "GET") {}
    // process `token` in url query params
    // send 404 Not Found if no token or invalid token
    //
    // POST
    // else if (req.method === "POST") {}
    // process `token` in url query params and `otp` in request payload
    // send 404 Not Found if no token or invalid token
    // send 401 Unauthorized if otp is invalid
    // send accessToken to user and set refreshToken in http-only cookie
    // else { res.sendStatus(404) or Error }
  };
}
