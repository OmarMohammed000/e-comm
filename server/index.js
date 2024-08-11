import express from "express"
import session from "express-session";
import passport from "passport";
import db from "./models/index.js";
import initialize  from "./passport-config.js";
import env from "dotenv";
import loginRoute from "./routes/loginRoute.js"
import registerRoute  from "./routes/registerRoute.js"
import logout from "./routes/logoutRoute.js";
import refreshToken from "./routes/refreshTokenRoute.js";
const app=express();
initialize(passport);
env.config();
// Setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({extended:true}));

app.use("/",registerRoute);
app.use("/",loginRoute);
app.use("/",logout)
app.use("/",refreshToken)
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  });