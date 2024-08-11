import passport from "passport";
import jwt from "jsonwebtoken"
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
      //implement the jwt but only if user is admin
      if(user.isAdmin){
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "30m" }
      );
      //Refersh token 
      const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      });
      user.update({refreshToken});
      res.cookie("jwt", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
      // Send a success response with user details
      return res.json({
        message: "Login successful",
        user: { id: user.id, email: user.email },accessToken,
        refreshToken,
      });
      }else{
        return res.json({
          message: "Login successful",
          user: { id: user.id, email: user.email },});
      }
    });
  })(req, res, next); // Pass the request to Passport's authenticate middleware
}
export default loginApp;
