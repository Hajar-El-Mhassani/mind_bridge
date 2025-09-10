import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const validate = (schemas) => {
  return async (req, res, next) => {
    try {
      for (const [segment, schema] of Object.entries(schemas)) {
        if (schema) {
          req[segment] = await schema.parseAsync(req[segment]);
        }
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          errors: messages,
        });
      }
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message || error });
    }
  };
};
