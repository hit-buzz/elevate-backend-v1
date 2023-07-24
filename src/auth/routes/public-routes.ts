import { Request, Response, Router } from "express";
import routes from "../../components/users/routes/user-route";
const route = Router();

route.use("/user", routes);

route.get("/health", (_: Request, res: Response) => {
  res.status(401).json({ message: "UP" });
});

export default route;
