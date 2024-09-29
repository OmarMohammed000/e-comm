import passport from "passport";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function loginApp(req, res, next) {
  // Use Passport's 'local' strategy to authenticate
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Pass any errors to Express
    }
    if (!user) {
      // If authentication fails, send a 401 Unauthorized response
      return res.status(401).json({ message: info.message || "Login failed" });
    }

    // Log the user in if authentication succeeds
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Pass any errors to Express
      }

      // Destructure the needed user attributes
      const { email, user_name, isAdmin, phone, address } = user;

      // Implement the JWT but only if user is admin
      if (isAdmin) {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "30m" }
        );

        // Refresh token
        const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
          expiresIn: "7d",
        });

        // Update the user with the refresh token (assuming this is a Sequelize model)
        user.update({ refreshToken });

        // Set JWT token in the cookies
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        // Send a success response with user details and tokens
        return res.json({
          message: "Login successful",
          user: {
            email,
            user_name,
            isAdmin,
            phone,
            address,
          },
          accessToken,
          refreshToken,
        });
      } else {
        // If not admin, just return the user details without JWT tokens
        return res.json({
          message: "Login successful",
          user: {
            email,
            user_name,
            isAdmin,
            phone,
            address,
          },
        });
      }
    });
  })(req, res, next); // Pass the request to Passport's authenticate middleware
}

export default loginApp;
