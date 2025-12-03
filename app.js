import express from "express";
import cors from "cors";
//import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./src/lib/auth.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", auth.express());
// Start the server
// App pathing 
app.use(express.static('src'));
app.post('/login', () => {
    res.sendFile(path.join(process.cwd(), "src/sign_in.html"))
})
app.post('/logout', () => {
  // to be fixed
})
app.get("/", () => {
	res.sendFile(path.join(process.cwd(), "src/index.html"))
})
app.get("/games", () => {
	res.sendFile(path.join(process.cwd(), "src/about.html"))
})
app.get("/about", () => {
	res.sendFile(path.join(process.cwd(), "src/about.html"))
})
app.get("/about", () => {
	res.sendFile(path.join(process.cwd(), "src/about.html"))
})

// Exporting app to be used on server.js
module.exports(app)