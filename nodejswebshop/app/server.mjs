import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRouter from "./routes/User.mjs";

const privateKeyPath = path.join(__dirname, "Key&Certificate", "private.key");
const certificatePath = path.join(
  __dirname,
  "Key&Certificate",
  "certificate.crt"
);

function readFileSyncSafe(path) {
  try {
    return fs.readFileSync(path);
  } catch (error) {
    console.error(`Failed to load file at ${path}:`, error.message);
    process.exit(1); 
  }
}

const privateKey = readFileSyncSafe(privateKeyPath);
const certificate = readFileSyncSafe(certificatePath);

const options = {
  key: privateKey,
  cert: certificate,
};

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use("/users", userRouter);

http.createServer(app).listen(80, () => {
  console.log("HTTP server running on port 80");
});

https
  .createServer(options, app)
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  })
  .on("error", (error) => {
    console.error("HTTPS server failed to start:", error);
  });

  // https://localhost/login