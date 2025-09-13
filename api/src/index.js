import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import db from "./database_client.js";
import usersRouter from "./routers/users.js";
import coursesRouter from "./routers/courses.js";
import lessonsRouter from "./routers/lessons.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
const apiRouter = express.Router();

// Serve user images in url : hhtp://localhost:3001/uploads/users/image.jpg
app.use("/uploads/users", express.static("uploads/users"));
// Serve course images
app.use("/uploads/courses", express.static("uploads/courses"));

// health check endpoint
apiRouter.get("/health", async (_req, res) => {
  try {
    await db.raw("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// This is the router for the users
apiRouter.use("/users", usersRouter);

// This is the router for the courses
apiRouter.use("/", coursesRouter);

// This is the router for the lessons
apiRouter.use("/", lessonsRouter);

app.use("/api", apiRouter);
app.listen(process.env.API_PORT || 3001, () => {
  console.log(
    `API running on http://localhost:${process.env.API_PORT || 3001}/api`
  );
});
