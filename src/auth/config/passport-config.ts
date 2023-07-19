import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express-serve-static-core";
import * as authService from "../services/auth-service";

export const initializeAuthentication = (app: Express) => {
  console.log("initializing authentication for application");
  app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user: any, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((id, done) => {
    console.log("id===", id);
    const user = { email: id, username: id };
    done(null, user);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authService.validatedUser
    )
  );
  return passport;
};
