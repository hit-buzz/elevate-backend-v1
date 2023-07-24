import { Request, Response } from "express";
import prisma from "../../../config/prisma";
import * as AWS from "aws-sdk";
import userSchema from "../models/user";
import crypto from "crypto";
import cognito from "../../../auth/config/aws-cognito-config";
import { SignUpRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";
import {
  CognitoUserAttribute,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import userPool from "../../../auth/config/aws-cognito-config";

// export const saveNewUser = (req: Request, res: Response) => {
//   console.log("received request to save users", req.body);
//   const user = userSchema.parse(req.body);
//   prisma.user
//     .findUnique({
//       where: {
//         email: user.email,
//       },
//     })
//     .then((u) => {
//       if (u != null) {
//         return res.status(400).json({ message: "user already registered" });
//       }
//       prisma.user
//         .create({
//           data: user,
//         })
//         .then((user) => {
//           return res.status(201).json(user);
//         })
//         .catch((err) => {
//           return res.status(500).json({ message: "user creation failed" });
//         });
//     })
//     .catch((err) => {
//       return res.status(500).json({ message: "user creation failed" });
//     });
// };

// export const getUserById = (req: Request, res: Response) => {
//   const users = userSchema.parse(req.body);
//   return prisma.user
//     .findMany({
//       where: {
//         email: { equals: users.email },
//       },
//     })
//     .then((success) => {
//       return success;
//     })
//     .catch((err) => {
//       console.log("error occured while finding user", err);
//     });
// };

// export const saveNewUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const params: SignUpRequest = {
//     ClientId: process.env.AWS_CLIENT_ID || "mk4hcustadhvj9f3u2gjqqjoa",
//     Username: email,
//     Password: password,
//     UserAttributes: [
//       {
//         Name: "email",
//         Value: email,
//       },
//       {
//         Name: "updated_at",
//         Value: Date.now().toString(),
//       },
//     ],
//     SecretHash: generateSecretHash(
//       "mk4hcustadhvj9f3u2gjqqjoa",
//       "1aqqq0j9g45bfn89tv3b3f3ffvd7s2q7c3ppbf1kikbgpq760b14",
//       email
//     ),
//   };

//   try {
//     const result = await cognito.signUp(params).promise();
//     console.log(result);
//     return res.status(200).json(result);
//   } catch (err) {
//     console.error("Error during signup:", err);
//     res.status(500).json({ message: "Signup failed" });
//   }
// };

// function generateSecretHash(
//   clientId: string,
//   clientSecret: string,
//   username: string
// ) {
//   const hmac = crypto.createHmac("sha256", clientSecret);
//   hmac.update(username + clientId);
//   return hmac.digest("base64");
// }

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body)
  const emailUserAttribute = new CognitoUserAttribute({
    Name: "email",
    Value: email,
  });

  try {
    userPool.signUp(
      email,
      password,
      [emailUserAttribute],
      [],
      (err, result) => {
        if (err) {
          console.error("Error during user signup:", err);
          return res.status(500).json({ error: "Failed to sign up user." });
        }
        console.log("User signup successful:", result);
        res.status(201).json({ message: "User signup successful." });
      }
    );
  } catch (err) {
    console.error("Error occurred during signup error");
    res.status(500).json({ error: "Failed to sign up user " });
  }
};

