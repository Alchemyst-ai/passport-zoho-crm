"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `APIError` error.
 *
 * References:
 *   - https://developer.github.com/v3/#client-errors
 *
 * @constructor
 * @param {string} [message]
 * @param {number} [code]
 * @access public
 */
class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIError";
        this.message = message;
        this.status = 500;
        Error.call(this);
        Error.captureStackTrace(this, arguments.callee);
    }
}
// Inherit from `Error`.
// APIError.prototype.__proto__ = Error.prototype.__proto__;
// Expose constructor.
exports.default = APIError;
//# sourceMappingURL=apierror.js.map