"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load modules.
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
const apierror_1 = __importDefault(require("./errors/apierror"));
const Profile = __importStar(require("./profile"));
/**
 * `Strategy` constructor.
 *
 * The Zoho CRM authentication strategy authenticates requests by delegating to
 * Zoho CRM using the OAuth 2.0 protocol.
 *
 * Applications must supply a `Authorized redirect URL` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Zoho CRM application's Client ID
 *   - `clientSecret`  your Zoho CRM application's Client Secret
 *   - `redirect_URL`   URL to which Zoho CRM will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request.  valid scopes for the modules API include:
 *                     'ZohoCRM.modules.ALL', 'ZohoCRM.modules.read', 'ZohoCRM.modules.Leads', 'ZohoCRM.modules.salesorders', or none.
 *                     (see https://www.zoho.com/crm/help/api/v2/#Modules-APIs for more info)
 *   — `response_type` Specify response_type as "code"
 *                     (see http://developer.github.com/v3/#user-agent-required for more info)
 *   - `access_type`   Specify access_type as online or offline. If you want to generate the refresh token,
 *                     please set the value as "offline"
 *
 *
 * Examples:
 *
 *     passport.use(new ZohoCRMStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         redirect_URL: 'https://www.example.net/auth/zohocrm/callback',
 *         scope: 'ZohoCRM.modules.READ',
 *         response_type: 'code',
 *         access_type: 'offline'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
class Strategy extends passport_oauth2_1.default {
    constructor(options, verify) {
        super(options, verify);
        options = options || {};
        options.authorizationURL =
            options.authorizationURL || "https://accounts.zoho.com/oauth/v2/auth";
        options.tokenURL =
            options.tokenURL || "https://accounts.zoho.com/oauth/v2/token";
        options.scopeSeparator = options.scopeSeparator || ",";
        options.customHeaders = options.customHeaders || {};
        if (!options.customHeaders["redirect_URL"]) {
            options.customHeaders["redirect_URL"] =
                options.redirect_URL || "passport-zoho-crm";
        }
        if (!options.customHeaders["access_type"]) {
            options.customHeaders["access_type"] =
                options.access_type || "passport-zoho-crm";
        }
        passport_oauth2_1.default.call(this, options, verify);
        this.name = "zoho-crm";
        this._userProfileURL =
            options.userProfileURL || "https://accounts.zoho.com/oauth/user/info";
        this._oauth2.useAuthorizationHeaderforGET(true);
        let _oauth2_getOAuthAccessToken = this._oauth2.getOAuthAccessToken;
        this._oauth2.getOAuthAccessToken = function (code, params, callback) {
            if (typeof params === "function") {
                callback = params;
                params = {};
            }
            _oauth2_getOAuthAccessToken.call(code, params, function (err, accessToken, refreshToken, params) {
                if (err) {
                    return callback(err);
                }
                if (!accessToken) {
                    return callback({
                        statusCode: 400,
                        data: JSON.stringify(params),
                    });
                }
                callback(null, accessToken, refreshToken, params);
            });
        };
    }
    /**
     * Retrieve user profile from Zoho CRM.
     *
     * This function constructs a normalized profile, with the following properties:
     *
     *   - `provider`         always set to `zoho-crm`
     *   - `id`               the user's Zoho ID
     *   - `displayName`      the user's full name
     *   - `emails`           the user's email addresses
     *
     * @param {string} accessToken
     * @param {function} done
     * @access protected
     */
    userProfile(accessToken, done) {
        this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
            let json;
            if (err) {
                if (err.data) {
                    try {
                        json = JSON.parse(err.data);
                    }
                    catch (_) { }
                }
                if (json && json.message) {
                    return done(new apierror_1.default(json.message));
                }
                return done(new passport_oauth2_1.default.InternalOAuthError("Failed to fetch user profile", err)
                // new InternalOAuthError("Failed to fetch user profile", err)
                );
            }
            try {
                json = JSON.parse(!!body ? body.toString() : "{}");
            }
            catch (ex) {
                return done(new Error("Failed to parse user profile"));
            }
            let profile = Profile.parse(json);
            profile.provider = "zoho-crm";
            profile._raw = body;
            profile._json = json;
            done(null, profile);
        });
    }
    authorizationParams(options) {
        let opts = {};
        if (options.access_type) {
            opts.access_type = options.access_type;
        }
        return opts;
    }
}
// Expose constructor.
exports.default = Strategy;
//# sourceMappingURL=strategy.js.map