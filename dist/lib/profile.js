"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
/**
 * Parse profile.
 *
 * @param {object|string} jsonParsed
 * @return {object}
 * @access public
 */
const parse = (json) => {
    let jsonParsed;
    if ("string" == typeof json) {
        jsonParsed = JSON.parse(json);
    }
    else {
        jsonParsed = json;
    }
    const profile = {
        id: "",
        displayName: "",
        emails: [],
    };
    profile.id = String(jsonParsed.ZUID);
    profile.displayName = jsonParsed.Display_Name;
    if (jsonParsed.email) {
        profile.emails = [{ value: jsonParsed.email }];
    }
    // Needs to be added on Zoho CRM's OAuth implementation
    if (jsonParsed.avatar_url) {
        profile.photos = [{ value: jsonParsed.avatar_url }];
    }
    return profile;
};
exports.parse = parse;
//# sourceMappingURL=profile.js.map