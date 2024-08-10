import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import db from "./models/index.js";

function initialize(passport) {
  // Define the local strategy for Passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // Field name in the login form
        passwordField: "password", // Field name in the login form
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
            // Passwords match, return the user
            return done(null, user);
          } else {
            // Passwords do not match
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (error) {
          // Handle any errors that occurred during the process
          return done(error);
        }
      }
    )
  );

  // Serialize user information into the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user information from the session
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