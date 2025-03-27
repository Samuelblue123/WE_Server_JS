import { AppError } from "../errors/base/appError.js";
import { ErrorResponse, HttpErrorResponse } from "../communication/responses/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    console.warn("error from route:", req.originalUrl, "method:", req.method);
    if (err instanceof AppError) {
        console.error(err.message, err.stack);
        res.status(err.statusCode).send(ErrorResponse.createWithError(err));
    } else {
        console.error("Unexpected error:", err);
        res.status(500).send(HttpErrorResponse.InternalServerError);
    }
};