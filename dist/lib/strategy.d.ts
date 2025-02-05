import { default as OAuth2Strategy } from "passport-oauth2";
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
declare class Strategy extends OAuth2Strategy {
    _userProfileURL: string;
    constructor(options: OAuth2Strategy.StrategyOptionsWithRequest & {
        redirect_URL?: string;
        access_type?: string;
        userProfileURL?: string;
    }, verify: OAuth2Strategy.VerifyFunctionWithRequest);
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
    userProfile(accessToken: string, done: (err?: unknown, profile?: any) => void): void;
    authorizationParams(options: any): object;
}
export default Strategy;
