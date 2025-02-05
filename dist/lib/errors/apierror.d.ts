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
declare class APIError extends Error {
    status: number;
    constructor(message: string);
}
export default APIError;
