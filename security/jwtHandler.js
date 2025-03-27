import jwt from "jsonwebtoken";
import "../config.js";
import { TokenResponse } from "../communication/responses/tokenResponse.js";
export class JwtTokenHandler {
    secretKey;
    refreshKey;
    options;
    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY;
        this.refreshKey = process.env.JWT_REFRESH_SECRET_KEY || "placeholder";
        this.options = { expiresIn: "24h" };
    }
    static create() {
        return new JwtTokenHandler();
    }
    async generateToken(validationKey) {
        if (validationKey === process.env.JWT_VALIDATION_KEY) {
            return this.signJwtToken("to be implemented");
        }
        return this.signJwtToken("to be implemented");
    }
    signJwtToken(username) {
        let response;
        const jwtToken = jwt.sign({ username: username }, this.secretKey, this.options);
        const refreshToken = jwt.sign({ username: "placeholder" }, this.refreshKey, { expiresIn: "7d" });
        response = new TokenResponse(jwtToken, refreshToken);
        return response;
    }
}
//# sourceMappingURL=jwtHandler.js.map