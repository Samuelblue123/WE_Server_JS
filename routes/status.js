import { Router } from "express";
/**
 * Maps an app status checking endpoint
 */
const statusRouter = Router();
statusRouter.get("/", (request, response) => {
    response.status(200).send("Service Live");
});
export default statusRouter;
//# sourceMappingURL=status.js.map