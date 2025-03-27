export class ErrorResponse {
    status;
    title;
    errorMessage;
    constructor(status, title, errorMessage) {
        this.status = status;
        this.title = title;
        this.errorMessage = errorMessage;
    }
    static create(status, title, errorMessage) {
        return new ErrorResponse(status, title, errorMessage);
    }
    static createWithError(err) {
        return new ErrorResponse(err.statusCode, err.name, err.message);
    }
}
export class HttpErrorResponse {
    static InternalServerError = ErrorResponse.create(500, "InternalServerError", "An unknown error has occurred.");
}
//# sourceMappingURL=errorResponse.js.map