import { NextFunction, Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import jwkToBuffer from "jwk-to-pem";

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface Request {
      user?: User;
    }
    interface User {}
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    console.log("no token found");
    return res.status(401).json({ message: "Unthorized" });
  }

  const publicKeyBuffer = fs.readFileSync("jwks.json", "utf8");
  const publicKeyJson = JSON.parse(publicKeyBuffer);
  console.log("public key", publicKeyJson);
  const decodedToken = jwt.decode(authorization, { complete: true });
  if (!decodedToken) {
    return res.status(401).json({ message: "Unthorized" });
  }
  const kid = decodedToken.header.kid;
  console.log("kid from token", kid);
  if (kid === undefined) {
    console.log("Signing key not found for the JWT token.");
    return res.status(401).json({ message: "Unthorized" });
  }
  const signingKey = publicKeyJson.keys.find((key: any) => key?.kid === kid);
  console.log("signingKey==>", signingKey);
  if (!signingKey) {
    console.log("Signing key not found for the JWT token.");
    return res.status(401).json({ message: "Unthorized" });
  }
  const pem = jwkToBuffer(signingKey);
  try {
    const verifiedToken = jwt.verify(authorization, pem, {
      algorithms: ["RS256"],
    }) as { email: string; email_verified: string; "cognito:username": string };

    console.log(verifiedToken);
    req.user = {
      email: verifiedToken.email,
      isEmailVerified: verifiedToken.email_verified,
      username: verifiedToken["cognito:username"],
    };
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};
