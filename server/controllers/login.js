function loginApp
(req, res, next) {
    // Use Passport's 'local' strategy to authenticate
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);  // Pass any errors to Express
      }
      if (!user) {
        // If authentication fails, send a 401 Unauthorized response
        return res.status(401).json({ message: info.message || 'Login failed' });
      }
      // Log the user in if authentication succeeds
      req.logIn(user, (err) => {
        if (err) {
          return next(err);  // Pass any errors to Express
        }
        // Send a success response with user details (omit sensitive info)
        return res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
      });
    })(req, res, next);  // Pass the request to Passport's authenticate middleware
  }
export default loginApp