import { config } from "../config/config.js";

export function authMiddleware(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({
      statusCode: 401,
      error: "Falta x-api-key"
    });
  }

  if (apiKey !== config.apiKey) {
    return res.status(403).json({
      statusCode: 403,
      error: "API key inválida"
    });
  }

  next();
}
