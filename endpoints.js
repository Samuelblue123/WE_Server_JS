import { Router } from "express";
import statusRouter from "./routes/status.js";
import healthRouter from "./routes/healthCheck.js";
import modVersionRouter from "./routes/modVersion.js";
import userInfoRouter from "./routes/userInfo.js";
import configRouter from ".//routes/serverConfig.js";
import { NotFoundError } from "./errors/implementations/notFoundError.js";
import { API_VERSION } from "./config.js";
export const mapEndpoints = (app) => {
    const guildRouter = Router({ mergeParams: true });
    app.use("/api/:version/*extra", (request, response, next) => {
        if (request.params.version !== API_VERSION) {
            response.status(301).send({ error: `please use /api/${API_VERSION}` });
            return;
        }
        next();
    });
    // Map all endpoints that don't require guild id
    app.use("/", statusRouter);
    app.use("/healthz", healthRouter);
    app.use(`/api/${API_VERSION}/mod`, modVersionRouter);
    app.use(`/api/${API_VERSION}/user`, userInfoRouter);
    app.use(`/api/${API_VERSION}/config`, configRouter);
    // Catch-all for incorrect routes,
    // but exclude Socket.IO paths.
    app.all("*extra", (req, res, next) => {
        if (req.path.startsWith("/socket.io") || req.path.startsWith("/server") || req.path.startsWith("/json/list") || req.path.startsWith("/json/version")) {
            // Let Socket.IO handle these requests
            return next();
        }
        throw new NotFoundError("not found");
    });
};
//# sourceMappingURL=endpoints.js.map