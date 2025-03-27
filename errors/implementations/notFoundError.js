import { AppError } from "../base/appError.js";
export class NotFoundError extends AppError {
    constructor(errorMessage) {
        super(errorMessage, 404);
    }
}
//# sourceMappingURL=notFoundError.js.map