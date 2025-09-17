import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import usersRouter from "./routers/users.js";
import coursesRouter from "./routers/courses.js";
import lessonsRouter from "./routers/lessons.js";
import authRouter from "./routers/auth.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
const apiRouter = express.Router();

app.use("/uploads/users", express.static("uploads/users"));
app.use("/uploads/courses", express.static("uploads/courses"));

apiRouter.use("/auth", authRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/", coursesRouter);

apiRouter.use("/", lessonsRouter);

app.use("/api", apiRouter);
app.listen(process.env.API_PORT || 3001, () => {
  console.log(
    `API running on http://localhost:${process.env.API_PORT || 3001}/api`
  );
});
