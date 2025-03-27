import { AppError } from "../base/appError.js";
export class ValidationError extends AppError {
    constructor(errorMessage) {
        super(errorMessage, 400);
    }
}
//# sourceMappingURL=validationError.js.map