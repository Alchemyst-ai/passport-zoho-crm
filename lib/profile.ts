/**
 * Parse profile.
 *
 * @param {object|string} jsonParsed
 * @return {object}
 * @access public
 */
const parse = (json: string | Record<string, any>) => {
  let jsonParsed: Record<string, any>;
  if ("string" == typeof json) {
    jsonParsed = JSON.parse(json);
  } else {
    jsonParsed = json;
  }

  const profile: {
    id: string;
    displayName: string;
    emails?: { value: string }[];
    photos?: { value: string }[];
    provider?: string;
    _raw?: string | Buffer<ArrayBufferLike>;
    _json?: Record<string, any>;
  } = {
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

export { parse };
