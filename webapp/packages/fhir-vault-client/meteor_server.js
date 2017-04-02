var OAuth = Package.oauth.OAuth;
var Random = Package.random.Random;

OAuth.registerService(OAuth2.serviceName, 2, null, function(query) {
    console.log('OAuth.registerService()', query);

    var config = ServiceConfiguration.configurations.findOne({
        service: OAuth2.serviceName
    });

    if (!config) {
      throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    if (!config.baseUrl) {
        throw new ServiceConfiguration.ConfigError("Service found but it does not have a baseUrl configured.");
    }

    if (!config.loginUrl) {
        throw new ServiceConfiguration.ConfigError("Service found but it does not have a loginUrl configured.");
    }

    var response = getTokenResponse(query, config);

    console.log("response", response);

    var accessToken = response.accessToken;
    var identity = getIdentity(accessToken, config);

    var serviceData = {
        id: identity.id,
        accessToken: accessToken,
        expiresAt: (+new Date) + (1000 * response.expiresIn),
        identity: identity
    };

    return {
        serviceData: serviceData,
        options: {
            profile: {
                name: identity.email
            }
        }
    };
});

var isJSON = function(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

var getTokenResponse = function(query, config, autoscannedUrl) {
    var responseContent;
    var tokenUrl = '/oauth/token';
    if (autoscannedUrl) {
      tokenUrl = autoscannedUrl;
    }
    try {
        responseContent = HTTP.post(
            config.baseUrl + tokenUrl,
            {
                params: {
                    grant_type: 'authorization_code',
                    code: query.code,
                    client_id: config.clientId,
                    client_secret: OAuth.openSecret(config.secret),
                    redirect_uri: OAuth._redirectUri(OAuth2.serviceName, config)
                }
            }
        ).content;
    } catch (err) {
        throw new Error("Failed to complete OAuth handshake\n\n" + err.message);
    }

    if (!isJSON(responseContent)) {
        throw new Error("Failed to complete OAuth handshake" + responseContent);
    }

    var parsedResponse = JSON.parse(responseContent);
    var accessToken = parsedResponse.access_token;
    var expiresIn = parsedResponse.expires_in;

    if (!accessToken) {
        throw new Error("Failed to complete OAuth handshake\n\
      did not receive an oauth token.\n" + responseContent
        );
    }

    return {
        accessToken: accessToken,
        expiresIn: expiresIn
    };
};

var getIdentity = function(accessToken, config) {
    var fetchUrl = config.baseUrl + '/oauth/getIdentity';
    try {
        return HTTP.get(
            fetchUrl,
            {
                params: {
                    access_token: accessToken
                }
            }
        ).data;
    } catch (err) {
        throw new Error('Failed to fetch identity from '+ fetchUrl +'. ' + err.message);
    }
};

OAuth2.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
