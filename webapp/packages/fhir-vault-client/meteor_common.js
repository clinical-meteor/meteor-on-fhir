if (_.isUndefined(OAuth2)) {
  OAuth2 = {
    serviceName: 'FhirVault'
  };
}

Accounts.oauth.registerService(OAuth2.serviceName);

if (Meteor.isClient) {
  Meteor['loginWith' + OAuth2.serviceName] = function (options, callback) {
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(
      callback);
    OAuth2.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.' + OAuth2.serviceName],
    forOtherUsers: []
  });
}
