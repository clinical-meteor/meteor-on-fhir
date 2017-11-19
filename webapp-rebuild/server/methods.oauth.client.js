Meteor.methods({
  fetchMetadata: function (url){
    check(url, String);

    console.log('Fetching metadata', url);
    return HTTP.get(url);
  },

  addServiceConfiguration: function(configuration) {
    check(configuration, Object);

    delete configuration.autoscanServerUrl;

    configuration.loginStyle = 'popup';
    configuration.service = 'FhirVault'

    console.log('addServiceConfiguration()', configuration);

    return ServiceConfiguration.configurations.insert(configuration);
  },

  getBearerTokenOnUserAccount: function(){
    let user = Meteor.users.findOne({_id: this.userId});
    if (user && user.services && user.services.FhirVault) {
      return user.services.FhirVault.accessToken;
    }
  },

  /**
   * Convenience method for clearing out the service configuration. This should never exist in production.
   */
  resetServiceConfiguration: function() {
    console.log('resetServiceConfiguration()');
    ServiceConfiguration.configurations.remove({
      service: 'FhirVault'
    });
  },

    /**
     * AUTH FLOW - Step A7.
     * We have an access token. Get the user from the REST service.
     * This will perform a server-to-server request for the identification of the user. This method
     * is not one you will need to implement as the oauth2 client package does this for you. We are
     * doing it here to demonstrate each step of the oauth2 process.
     */
    getUserId: function() {
      var user = Meteor.user();

      if (user && user.services && user.services.FhirVault) {
        var serviceConfig = ServiceConfiguration.configurations.findOne({
          service: OAuth2.serviceName
        });


        return HTTP.get(
          serviceConfig.baseUrl + '/api/getUserId',
          {
            params: {
              access_token: user.services.FhirVault.accessToken
            }
          }
        );
      }
    },

    /**
     * AUTH FLOW - Step A8.
     * We have an access token. Get the user from the REST service.
     * This will perform a server-to-server request for the identification of the user. This method
     * is not one you will need to implement as the oauth2 client package does this for you. We are
     * doing it here to demonstrate each step of the oauth2 process.
     */
    getUserData: function(remoteUserId) {
      check(remoteUserId, String);

      var user = Meteor.user();
      var serviceConfig = ServiceConfiguration.configurations.findOne({
          service: OAuth2.serviceName
      });

      console.log("getUserData", serviceConfig);


      console.log('getting /api/getUserData/' + remoteUserId);
      return HTTP.get(
        serviceConfig.baseUrl + '/api/getUserData/' + remoteUserId,
        {
          params: {
            access_token: user.services.FhirVault.accessToken
          }
        }
      );
    },
    getUserAccessToken: function() {
      var user = Meteor.user();

      if (!isOAuth2User(user)) {
        return;
      }

      return user.services.FhirVault.accessToken;
    },
    getPatientData: function(patientSearchQuery){
      check(patientSearchQuery, Object);


      var user = Meteor.user();

      if (user && user.services && user.services.FhirVault) {

        var parameters = {
          params: {
            access_token: user.services.FhirVault.accessToken
          }
        };

        if (patientSearchQuery.patientName) {
          parameters.params.name = patientSearchQuery.patientName;
        }
        if (patientSearchQuery.patientGiven) {
          parameters.params.given = patientSearchQuery.patientGiven;
        }
        if (patientSearchQuery.patientFamily) {
          parameters.params.family = patientSearchQuery.patientFamily;
        }
        if (patientSearchQuery.patientGender) {
          parameters.params.gender = patientSearchQuery.patientGender;
        }
        if (patientSearchQuery.patientIdentifier) {
          parameters.params.identifier = patientSearchQuery.patientIdentifier;
        }
        if (patientSearchQuery.patientBirthdate) {
          parameters.params.birthdate = patientSearchQuery.patientBirthdate;
        }

        console.log('parameters', parameters);

        return HTTP.call('get', 'http://localhost:3100/fhir/Patient', parameters);
      }

    }

});



function isOAuth2User(user) {
  return user && user.services && user.services.FhirVault;
}
