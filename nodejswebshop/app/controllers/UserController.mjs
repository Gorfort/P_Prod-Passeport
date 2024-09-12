import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../auth/auth.mjs";
import "../db/Sequelize.mjs";
import { getUser } from "../db/Sequelize.mjs";

// Function to authenticate a user including admin check
export const authenticate = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const { password } = req.body;

  const user = await getUser(username);

  if (!user) {
    console.log("Login attempt failed for user: ", username);
    return res.status(404).json({ success: false, message: "User not found" });
  }
  console.log(user);
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = generateToken(username);
    res.cookie("auth", token);
    res.json({
      success: true,
      message: "Login successful!",
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
};

// Function to get user details or all user names if admin
export const get = (req, res) => {
  const username = req.params.username.toLowerCase();

  const token = req.cookies["auth"];
  const tokenUsername = verifyToken(token);

  if (tokenUsername !== username) {
    return res.status(401).send("Unauthorized User");
  }
  const user = getUser(username);

  if (user && user.admin) {
    // If the user is admin, list all user names except the admin

    res.send(`All users: TODO`);
  } else if (user) {
    res.send(`User: ${username}`);
  } else {
    res.status(404).send("User not found");
  }
};
