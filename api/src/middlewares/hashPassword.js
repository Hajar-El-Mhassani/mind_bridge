import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Utility function: hash a plain password.
 * Use in seeds.
 */
export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, saltRounds);
}

/**
 * Utility function: compare password with hashed password.
 * Use in login checks.
 */
export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Express middleware: automatically hash req.body.password.
 * Use in routes when creating/updating users.
 */
export async function hashPasswordMiddleware(req, res, next) {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next();
  } catch (err) {
    next(err);
  }
}
