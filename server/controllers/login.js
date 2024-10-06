import passport from "passport";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function loginApp(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Handle errors from Passport
    }
    if (!user) {
      return res.status(401).json({ message: info.message || "Login failed" });
    }

    
    req.logIn(user, async (err) => {
      if (err) {
        return next(err); 
      }

      const { email, user_name, isAdmin, phone, address } = user;

      if (isAdmin) {
        // Admin: Issue JWT tokens
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
          expiresIn: "7d",
        });

        // Update user with refresh token and save it
        await user.update({ refreshToken });

        // Set JWT access token as an HttpOnly cookie
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true, // Ensure this is only sent over HTTPS in production
          sameSite: "strict",
        });

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
          refreshToken, // You may want to issue refreshToken as HttpOnly cookie as well
        });
      } else {
        // Non-admin: No JWT, just establish the session
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
  })(req, res, next);
}

export default loginApp;
