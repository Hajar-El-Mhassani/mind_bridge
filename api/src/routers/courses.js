import express from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";

const coursesRouter = express.Router();

// get all courses
coursesRouter.get("/courses", async (req, res) => {
  try {
    let query = db("courses").select(
      "courses.id",
      "title",
      "description",
      "courses.image",
      "price",
      "level",
      "status",
      "category",
      "duration",
      "created_by",
      "courses.created_at",
      "courses.updated_at"
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

    const level = req.query.level;
    if (typeof level === "string") {
      if (level.length > 0 && level !== "All") {
        query = query.where("level", "=", `${level}`);
      }
    }

    const createdBy = req.query.created_by;
    if (createdBy) {
      if (!isNaN(createdBy) && createdBy > 0) {
        query = query.where("created_by", "=", `${createdBy}`);
      }
    }

    const price = req.query.price;
    if (typeof price === "string") {
      if (price.length > 0 && price !== "All") {
        switch (price) {
          case "free":
            query = query.where("price", "=", 0);
            break;
          case "paid":
            query = query.where("price", ">", 0);
            break;
        }
      }
    }

    const sort = req.query.sort;
    if (typeof sort === "string") {
      if (sort.length > 0) {
        switch (sort) {
          case "newest":
            query = query.orderBy("created_at", "desc");
            break;
          case "lowest-price":
            query = query.orderBy("price", "asc");
            break;
          case "highest-price":
            query = query.orderBy("price", "desc");
            break;
        }
      }
    } else {
      query = query.orderBy("created_at", "desc");
    }

    const courses = await query;

    // serve course image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image ? `${baseUrl}${course.image}` : null,
    }));

    res.json(formattedCourses);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

//  Fetch the list of authors to use in UI when filtering courses by author name
coursesRouter.get("/course-authors", async (req, res) => {
  try {
    let query = db("courses")
      .distinct()
      .select(
        "created_by",
        "users.name as creator_name" // get user name
      )
      .leftJoin("users", "courses.created_by", "users.id")
      .orderBy("creator_name");

    const creators = await query;
    res.json(creators);
  } catch (e) {
    console.log(e);
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
