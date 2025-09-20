import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { uploadUserImage } from "../middlewares/uploadUser.js";
import { StatusCodes } from "http-status-codes";
import knex from "../database_client.js";

const router = Router();

router.post("/register", uploadUserImage, register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);

router.put("/profile", authenticateToken, uploadUserImage, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, date_of_birth } = req.body;

    const updateData = {
      updated_at: knex.fn.now(),
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (date_of_birth) updateData.date_of_birth = date_of_birth;

    // If new image uploaded to Cloudinary
    if (req.file && req.file.path) {
      updateData.image = req.file.path;
    } else {
      // If no new image, keep existing one or fallback to Cloudinary default
      const existingUser = await knex("users").where({ id: userId }).first();
      if (!existingUser?.image || existingUser.image.startsWith("/uploads")) {
        updateData.image =
          "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg";
      }
    }

    // Check if email is already taken by someone else
    if (email) {
      const existingUser = await knex("users")
        .where({ email })
        .whereNot({ id: userId })
        .first();
      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({
          error: "Email is already taken by another user",
        });
      }
    }

    // Update in DB
    const updated = await knex("users")
      .where({ id: userId })
      .update(updateData);
    if (updated === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    // ✅ Fetch updated user
    const user = await knex("users")
      .select(
        "id",
        "name",
        "email",
        "image",
        "date_of_birth",
        "created_at",
        "updated_at"
      )
      .where({ id: userId })
      .first();

    // ✅ Normalize image: always return Cloudinary URL
    user.image = user.image?.startsWith("http")
      ? user.image
      : "https://res.cloudinary.com/dg6bvmi2c/image/upload/v1758320998/users/default.jpg";

    res.status(StatusCodes.OK).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update profile",
    });
  }
});

router.put("/change-password", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await knex("users")
      .select("password")
      .where({ id: userId })
      .first();

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found",
      });
    }

    const bcrypt = await import("bcrypt");
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Current password is incorrect",
      });
    }

    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await knex("users").where({ id: userId }).update({
      password: hashedNewPassword,
      updated_at: knex.fn.now(),
    });

    res.status(StatusCodes.OK).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to change password",
    });
  }
});

export default router;
