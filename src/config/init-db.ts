import prisma  from "./prisma";
export = (app: { listen: (arg0: number, arg1: () => void) => void }) =>
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to the database.");
      app.listen(+(process.env.PORT || 3000), () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      process.exit();
    });
