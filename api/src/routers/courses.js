import express from "express";

import { StatusCodes } from "http-status-codes";

import knex from "../database_client.js";
import { courseSchema } from "../validations/courseSchema.js";
import { validateBody } from "../middlewares/courseValidate.js";
import { upload } from "../middlewares/multer.js";
import { authenticateToken } from "../middlewares/auth.js";
const coursesRouter = express.Router();

coursesRouter.get("/courses", async (req, res) => {
  try {
    let query = knex("courses").select(
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
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => {
      let imageUrl = null;

      if (course.image) {
        if (course.image.startsWith("http")) {
          imageUrl = course.image; // already full URL (old records)
        } else {
          imageUrl = `${baseUrl}${course.image}`; // relative path (new records)
        }
      }

      return { ...course, image: imageUrl };
    });

    res.json(formattedCourses);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

coursesRouter.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await knex("courses").where({ id }).first();

    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course not found" });
    }

    const lessons = await knex("lessons").where({ course_id: id });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourse = {
      ...course,
      image: course.image
        ? course.image.startsWith("http")
          ? course.image
          : `${baseUrl}${course.image}`
        : null,
      lessons,
    };

    res.status(StatusCodes.OK).json(formattedCourse);
  } catch (error) {
    console.error("Error fetching course details:", error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
});

coursesRouter.get("/course-authors", async (req, res) => {
  try {
    let query = knex("courses")
      .distinct()
      .select("created_by", "users.name as creator_name")
      .leftJoin("users", "courses.created_by", "users.id")
      .orderBy("creator_name");

    const creators = await query;
    res.json(creators);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

coursesRouter.get("/my-courses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    let query = knex("courses").select(
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

    query = query.where("created_by", userId);

    const courses = await query;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = courses.map((course) => ({
      ...course,
      image: course.image
        ? course.image.startsWith("http")
          ? course.image // already a full URL (Cloudinary or old full)
          : `${baseUrl}${course.image}` // relative path
        : null,
    }));

    res.status(StatusCodes.OK).json(formattedCourses);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

coursesRouter.get("/my-courses/:id", authenticateToken, async (req, res) => {
  try {
    let query = knex("courses")
      .select(
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
      )
      .where("id", req.params.id)
      .first();

    console.log(query.toSQL());
    const course = await query;

    // Normalize image URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCourses = course.map((course) => ({
      ...course,
      image: course.image
        ? course.image.startsWith("http")
          ? course.image // already a full URL (Cloudinary or old full)
          : `${baseUrl}${course.image}` // relative path
        : null,
    }));
    res.status(StatusCodes.OK).json(formattedCourses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

coursesRouter.post(
  "/add-course",
  authenticateToken,
  upload.single("thumbnail"),
  validateBody(courseSchema), // courseSchema WITHOUT created_by
  async (req, res) => {
    try {
      const data = { ...req.validatedBody };

      // enforce authenticated user id
      data.created_by = req.user.id;

      if (req.file && req.file.path) {
        // Cloudinary gives you a secure URL in file.path
        data.image = req.file.path;
      } else {
        // Use a placeholder image hosted in Cloudinary
        data.image =
          "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758231129/default_ucp3wc.jpg";
      }

      const [course] = await knex("courses").insert(data).returning("*");

      res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

coursesRouter.put(
  "/my-courses/:id",
  authenticateToken,
  upload.single("thumbnail"), // handle file upload
  async (req, res) => {
    console.log("Request body:", req.body);

    const id = req.params.id;
    try {
      const data = { ...req.body };

      //  Check if user exists
      const user = await knex("users").where({ id: data.created_by }).first();

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid created_by: user not found" });
      }

      if (req.file) {
        data.image = `/uploads/courses/${req.file.filename}`;
      } else {
        const course = await knex("courses").where("id", id);
        data.image = course.image;
      }

      // Insert course
      await knex("courses").where("id", id).update(data);

      res.status(201).json({ message: "Course updated successfully" });
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

coursesRouter.delete("/my-courses/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    if (id && !isNaN(id) && id > 0) {
      const result = await knex("courses")
        .where({ id: id, created_by: userId })
        .delete();

      if (result === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Course not found or you don't have permission to delete it",
        });
      }

      res.status(StatusCodes.OK).send("success");
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id value" });
    }
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
});

export default coursesRouter;
