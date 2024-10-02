import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import db from "../models/index.js";

function initialize(passport) {
  // Define the local strategy for Passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password", 
      },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({ where: { email } });

          // If no user is found with the given email
          if (!user) {
            return done(null, false, { message: "No user with that email" });
          }

          // Compare the input password with the stored hashed password
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            
            return done(null, user);
          } else {
            
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (error) {
         
          return done(error);
        }
      }
    )
  );

  // Serialize user information into the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export default initialize