import { AppError } from "../base/appError.js";
export class DatabaseError extends AppError {
    constructor() {
        super("An error has occurred while performing database actions.", 500);
    }
}
//# sourceMappingURL=databaseError.js.map