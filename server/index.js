import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import db from "./models/index.js";
import initialize from "./utils/passport-config.js";
import env from "dotenv";
import loginRoute from "./routes/loginRoute.js";
import registerRoute from "./routes/registerRoute.js";
import logout from "./routes/logoutRoute.js";
import refreshToken from "./routes/refreshTokenRoute.js";
import admin from "./routes/admin/admin.js";
import cookieParser from "cookie-parser";
import home from "./routes/home.js";
import order from "./routes/order.js";
import cart from "./routes/cart.js";
import products from "./routes/product.js";

const app = express();

initialize(passport);
env.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure:  process.env.NODE_ENV === 'production' ,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", logout);
app.use("/", refreshToken);
app.use("/", admin);
app.use("/", home);
app.use("/", cart);
app.use("/", order);
app.use("/", products);
const PORT = process.env.PORT || 4000; 
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database & tables: ", err);
  });
