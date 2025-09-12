import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const coursesRouter = express.Router();

// get all courses
coursesRouter.get("/courses", async (req, res) => {
  try {
    const courses = await db("courses").select(
      "id",
      "title",
      "description",
      "image",
      "price",
      "level",
      "status",
      "category",
      "duration",
      "created_by",
      "created_at",
      "updated_at"
    );
    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image ? `${baseUrl}${course.image}` : null,
    }));

    res.json(formattedCourses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

//GET all courses created by logged-in user
coursesRouter.get("/my-courses", async (req, res) => {
  try {
    let query = db("courses").select(
      "id",
      "title",
      "description",
      "image",
      "price",
      "level",
      "status",
      "category",
      "enrolled",
      "created_by",
      "created_at",
      "updated_at"
    );

    const search = req.query.search;
    if (typeof search === "string") {
      if (search.length > 0) {
        query = query.where((qb) => {
          qb.where("title", "ilike", `%${search}%`).orWhere(
            "description",
            "ilike",
            `%${search}%`
          );
        });
      }
    }

    const category = req.query.category;
    if (typeof category === "string") {
      if (category.length > 0 && category !== "All") {
        query = query.where("category", "=", `${category}`);
      }
    }

    query = query.where("created_by", 1);
    console.log(query.toSQL());
    const courses = await query;

    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image ? `${baseUrl}${course.image}` : null,
    }));

    res.json(formattedCourses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default coursesRouter;
