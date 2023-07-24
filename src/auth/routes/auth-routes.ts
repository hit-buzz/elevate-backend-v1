import { Request, Response, Router } from "express";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../config/aws-cognito-config";
import { verifyToken } from "../services/auth-service";

const route = Router();

route.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session) => {
      console.log(session);
      const jwtToken = session.getIdToken().getJwtToken();
      res.json({ token: jwtToken });
    },
    onFailure: (err) => {
      console.error("Error during user authentication:", err);
      res.status(401).json({ error: "Authentication failed." });
    },
  });
});
export default route;
