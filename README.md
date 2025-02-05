# Passport Strategy for Zoho CRM

<!-- [![Build](https://img.shields.io/travis/jaredhanson/passport-github.svg)](https://travis-ci.org/jaredhanson/passport-github)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/passport-github.svg)](https://coveralls.io/r/jaredhanson/passport-github)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/passport-github.svg?label=quality)](https://codeclimate.com/github/jaredhanson/passport-github)
[![Dependencies](https://img.shields.io/david/jaredhanson/passport-github.svg)](https://david-dm.org/jaredhanson/passport-github) -->

[Passport](http://passportjs.org/) strategy for authenticating with [Zoho CRM](https://www.crm.zoho.com/)
using the OAuth 2.0 API. Forked from [**zoho-crm-passport**](https://www.npmjs.com/package/zoho-crm-passport)

This module lets you authenticate using Zoho CRM in your Node.js applications.
By plugging into Passport, Zoho CRM authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install zoho-crm-passport
```

## Usage

#### Create an Application

Before using `zoho-crm-passport`, you must register an application with Zoho CRM.
If you have not already done so, a new application can be created at
[developer applications](https://accounts.zoho.com/developerconsole) within
Zoho's settings panel. Your application will be issued a client ID and client
secret, which need to be provided to the strategy. You will also need to
configure a authorized redirect URL (ie, callback URL) which matches the route in your application.

Note: Don't use hyphens in your client domain while registering your application on
Zoho CRM's developer console. If you have an invalid URL, it will throw an error as follows: `Error Occured`

#### Configure Strategy

The Zoho CRM authentication strategy authenticates users using a Zoho CRM account
and OAuth 2.0 tokens. The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Zoho CRM profile. The `verify` callback must call `cb` providing a user to
complete authentication.

**CommonJS syntax**

```js
let ZohoCRMStrategy = require('zoho-crm-passport').Strategy;

passport.use(new ZohoCRMStrategy({
    clientID: ZOHOCRM_CLIENT_ID,
    clientSecret: ZOHOCRM_CLIENT_SECRET,
    redirect_URL: "http://127.0.0.1:3000/auth/zohocrm/callback"
    scope: 'ZohoCRM.modules.READ',
    response_type: 'code',
    access_type: 'offline'
  },
  function(accessToken, refreshToken, profile, cb) {
    // ...
    });
);
```

**ES6 Syntax**

```typescript
import { Strategy as ZohoCRMStrategy} from 'zoho-crm-passport';

passport.use(new ZohoCRMStrategy({
    clientID: ZOHOCRM_CLIENT_ID,
    clientSecret: ZOHOCRM_CLIENT_SECRET,
    redirect_URL: "http://127.0.0.1:3000/auth/zohocrm/callback"
    scope: 'ZohoCRM.modules.READ',
    response_type: 'code',
    access_type: 'offline'
  },
  function(accessToken, refreshToken, profile, cb) {
    // ...
    });
);
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'zoho-crm'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get("/auth/zohocrm", passport.authenticate("zoho-crm"));

app.get(
  "/auth/zohocrm/callback",
  passport.authenticate("zoho-crm", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
```

## Examples

For a complete, working example, refer to the (WIP) [login example](https://github.com/siddarthramesh/zoho-crm-passport/tree/master/).

## Contributing

#### Tests

The test suite is located in the `test/` directory. All new features are
expected to have corresponding test cases. Ensure that the complete test suite
passes by executing:

```bash
$ npm install --dev
$ make test
```

#### Coverage

The test suite covers 100% of the code base. All new feature development is
expected to maintain that level. Coverage reports can be viewed by executing:

```bash
$ make test-cov
$ make view-cov
```

+[![Build Status for Original Package](https://secure.travis-ci.org/idris/zoho-crm-passport.png)](http://travis-ci.org/idris/zoho-crm-passport)

## Credits

- [Siddarth Ramesh - the maker of the OG JS package](http://github.com/siddarthramesh) which he forked from [passport-github](https://github.com/jaredhanson/passport-github) by [Jared Hanson](https://github.com/jaredhanson)
- [Anuran Roy](https://github.com/anuran-roy)

## License

[The MIT License](http://opensource.org/licenses/MIT)
