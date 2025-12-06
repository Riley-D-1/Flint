import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.post("/login", (req, res) => {
  res.send("Login route not yet implemented");
});
app.post("/logout", (req, res) => {
  res.send("Logout route not yet implemented");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Exporting app
export default app;