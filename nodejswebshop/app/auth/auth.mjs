import jwt from "jsonwebtoken";
const secretKey = "your-secret-key";

export const generateToken = (username) => {
  const payload = {
    username: username,
  };
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const verifyToken = (token) => {
  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded.username;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
