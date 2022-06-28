"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleMusicError = void 0;
class AppleMusicError extends Error {
    constructor(message, httpStatusCode, response) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.response = response;
    }
}
exports.AppleMusicError = AppleMusicError;
//# sourceMappingURL=appleMusicError.js.map