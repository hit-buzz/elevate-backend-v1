import dotenv from "dotenv";
import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk";
dotenv.config();

AWS.config.update({
  region: "us-east-1",
});

const poolData: ICognitoUserPoolData = {
  UserPoolId: "us-east-1_H0BRAofpZ",
  ClientId: "7ingu9nclrppjrmlur6h3pugik",
};

const userPool = new CognitoUserPool(poolData);
export default userPool;
