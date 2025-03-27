import { Router } from "express";
/**
 * Maps a health check endpoint
 */
const healthRouter = Router();
healthRouter.get("/", (request, response) => {
    response.status(200);
    response.send("responseCode: " + response.statusCode);
});
export default healthRouter;
//# sourceMappingURL=healthCheck.js.map