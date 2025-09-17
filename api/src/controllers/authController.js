import { StatusCodes } from "http-status-codes";
import db from "../database_client.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, date_of_birth } = req.body;

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Name, email, and password are required",
      });
    }

    const existingUser = await db("users").where("email", email).first();

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "User with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const imagePath = req.file ? req.file.filename : null;

    const [newUser] = await db("users")
      .insert({
        name,
        email,
        password: hashedPassword,
        date_of_birth: date_of_birth || null,
        image: imagePath,
      })
      .returning([
        "id",
        "name",
        "email",
        "image",
        "date_of_birth",
        "created_at",
      ]);

    const token = generateToken({ userId: newUser.id });

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email and password are required",
      });
    }

    const user = await db("users").where("email", email).first();

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }

    const token = generateToken({ userId: user.id });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Login failed",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to get profile",
    });
  }
};
