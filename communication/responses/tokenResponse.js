export class TokenResponse {
    token;
    refreshToken;
    constructor(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
// TODO add standard api response model, using mongoose's find query projection parameter to only send what is necessary
//# sourceMappingURL=tokenResponse.js.map