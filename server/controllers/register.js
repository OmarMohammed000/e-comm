import bycrpt, { hash } from "bcrypt";
import db from "../models/index.js";
const saltRounds = 4;
async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const address = req.body.address;
  const phone = req.body.phone;
  try {
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      res.status(400).json({ message: "Email already registered" });
    } else {
      bycrpt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error. hashing password:", err);
        } else {
          const result = await db.User.create({
            user_name: username,
            password: hash,
            email,
            address,
            phone,
          });
          res.status(201).json({ message: "User registered successfully" });
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
  }
}
export default register
