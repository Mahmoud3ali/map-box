import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.headers["Authorization"] ||
    req.headers["authorization"] ||
    req.headers["x-access-token"] ||
    req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  if (typeof token !== "string") {
    return res.status(403).send({ error: "Bad request" });
  }

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
