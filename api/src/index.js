import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import db from "./database_client.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
const apiRouter = express.Router();

// health check endpoint
apiRouter.get("/health", async (_req, res) => {
  try {
    await db.raw("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
// demo: get all users
apiRouter.get("/users", async (_req, res) => {
  const users = await db("users").select("*");
  res.json(users);
});

app.use("/api", apiRouter);
app.listen(process.env.API_PORT || 3001, () => {
  console.log(
    `API running on http://localhost:${process.env.API_PORT || 3001}/api`
  );
});
