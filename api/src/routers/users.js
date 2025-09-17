import express from "express";
import { StatusCodes } from "http-status-codes";
import knex from "../database_client.js";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../validations/userValidation.js";
import { validate } from "../middlewares/validation.js";

const usersRouter = express.Router();

export default usersRouter;

usersRouter.get("/", async (req, res) => {
  try {
    const users = await knex("users").select(
      "id",
      "name",
      "email",
      "image",
      "password",
      "date_of_birth",
      "created_at",
      "updated_at"
    );
    // serve user image with full url
    const baseUrl = `${req.protocol}://${req.get("host")}`; // Fixed: _req -> req
    const formattedUsers = users.map((user) => {
      return {
        ...user,
        image: user.image ? `${baseUrl}${user.image}` : null,
      };
    });

    res.status(StatusCodes.OK).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
});

usersRouter.get(
  "/:id",
  validate({ params: userIdSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await knex("users")
        .select("id", "name", "email", "image", "created_at", "updated_at")
        .where({ id })
        .first();

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

usersRouter.post(
  "/",
  validate({ body: createUserSchema }),
  async (req, res) => {
    try {
      const { name, email, password, image } = req.body;

      const existingUser = await knex("users").where({ email }).first();

      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "User with this email already exists",
        });
      }

      const insertPayload = {
        name,
        email,
        password,
        image,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      };

      if (knex.client.config.client === "pg") {
        const [created] = await knex("users")
          .insert(insertPayload)
          .returning([
            "id",
            "name",
            "email",
            "image",
            "created_at",
            "updated_at",
          ]);
        return res.status(StatusCodes.CREATED).json({
          message: "User created successfully",
          user: created,
        });
      } else {
        const [newUserId] = await knex("users").insert(insertPayload);
        const newUser = await knex("users")
          .select("id", "name", "email", "image", "created_at", "updated_at")
          .where({ id: newUserId })
          .first();
        return res.status(StatusCodes.CREATED).json({
          message: "User created successfully",
          user: newUser,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

usersRouter.put(
  "/:id",
  validate({
    params: userIdSchema,
    body: updateUserSchema,
  }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      updateData.updated_at = knex.fn.now();

      delete updateData.id;
      delete updateData.created_at;

      const updated = await knex("users").where({ id }).update(updateData);

      if (updated === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      const user = await knex("users")
        .select("id", "name", "email", "image", "created_at", "updated_at")
        .where({ id })
        .first();

      res.status(StatusCodes.OK).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);

usersRouter.delete(
  "/:id",
  validate({ params: userIdSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await knex("users").where({ id }).first();

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }

      await knex("users").where({ id }).del();

      res.status(StatusCodes.OK).json({
        message: "User deleted successfully",
        deletedUser: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);
