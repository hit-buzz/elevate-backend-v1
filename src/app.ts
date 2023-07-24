//===============imports===========
import express from "express";
import initiaLizeDb from "./config/init-db";
// import { initializeAuthentication } from "./auth/config/passport-config";
import authRoute from "./auth/routes/auth-routes";
import protectedRoute from "./auth/routes/protected-routes";
import publicRoute from "./auth/routes/public-routes";
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import dotenv from "dotenv";
import * as AWS from "aws-sdk";
//=================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
// AWS.config.update({
//   region: "us-east-1",
// });
// const poolData = {
//   UserPoolId: "us-east-1_kxNAz8nhs",
//   ClientId: "3hajdoui39b9ff3gltbsdj184a",
// };
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// const cognito = new AWS.CognitoIdentityServiceProvider();
// initializeAuthentication(app);
initiaLizeDb(app);
app.use(publicRoute);
app.use(authRoute);
app.use(protectedRoute);
app.use((req, res, next) => {
  console.log("application is running...");
  res.status(404).json({ message: "404" });
});
