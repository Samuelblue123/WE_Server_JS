import { AppError } from "../base/appError.js";
export class HttpClientError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
//# sourceMappingURL=httpClientError.js.map