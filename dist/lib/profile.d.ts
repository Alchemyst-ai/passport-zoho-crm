/**
 * Parse profile.
 *
 * @param {object|string} jsonParsed
 * @return {object}
 * @access public
 */
declare const parse: (json: string | Record<string, any>) => {
    id: string;
    displayName: string;
    emails?: {
        value: string;
    }[];
    photos?: {
        value: string;
    }[];
    provider?: string;
    _raw?: string | Buffer<ArrayBufferLike>;
    _json?: Record<string, any>;
};
export { parse };
