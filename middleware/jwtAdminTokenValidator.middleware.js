import jwt from "jsonwebtoken";
import "../config.js";
// Needs to match the token in the generator. Store it in a .env or .json for reusability.
const secretKey = process.env.JWT_SECRET_KEY;
/**
 * Checks if the token provided in the request's headers is valid.
 * If token is invalid, return status code 401 with an error message,
 * else, return void.
 */
function validateAdminJwtToken(request, response, next) {
    const authorizationHeader = request.headers["authorization"];
    if (!authorizationHeader) {
        return response.status(401).send({ error: "No token provided." });
    }
    // Get authorization headers and extract token from "Bearer <token>"
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
            return response.status(401).send({ error: "Invalid token provided." });
        }
        const p = payload;
        if (!p.guildId) {
            return response.status(401).json({ error: "Invalid token provided." });
        }
        if (p.guildId !== "*") {
            return response.status(401).json({ error: "Invalid token provided." });
        }
        next(); // Goes to next step (function execution)
    });
}
export default validateAdminJwtToken;
//# sourceMappingURL=jwtAdminTokenValidator.middleware.js.map