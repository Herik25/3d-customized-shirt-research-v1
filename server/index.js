import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import geminiRoutes from "./routes/gemini.routes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api/v1/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
