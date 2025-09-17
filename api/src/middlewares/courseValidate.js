import { StatusCodes } from "http-status-codes";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      console.error("Validation failed:", result.error.format()); //log on server
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: result.error.format(), // frontend gets structured details
        message: "Validation failed",
      });
    }

    req.validatedBody = result.data;
    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid data" });
  }
};
