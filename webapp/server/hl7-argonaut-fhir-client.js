Meteor.methods({
    /**
     * Convenience method for clearing out the service configuration. This should never exist in production.
     */
    resetServiceConfiguration: function() {
      console.log('resetServiceConfiguration()');
      ServiceConfiguration.configurations.remove({
        service: OAuth2.serviceName // using the constant provided by the package, easy for refactoring.
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
      var serviceConfig = ServiceConfiguration.configurations.findOne({
        service: OAuth2.serviceName
      });


      return HTTP.get(
        serviceConfig.baseUrl + '/api/getUserId',
        {
          params: {
            access_token: user.services.OAuth2Server.accessToken
          }
        }
      );
    },

    /**
     * AUTH FLOW - Step A8.
     * We have an access token. Get the user from the REST service.
     * This will perform a server-to-server request for the identification of the user. This method
     * is not one you will need to implement as the oauth2 client package does this for you. We are
     * doing it here to demonstrate each step of the oauth2 process.
     */
    getUserData: function(remoteUserId) {

      var user = Meteor.user();
      var serviceConfig = ServiceConfiguration.configurations.findOne({
          service: OAuth2.serviceName
      });

      console.log('getting /api/gtUserData/' + remoteUserId);
      return HTTP.get(
        serviceConfig.baseUrl + '/api/getUserData/' + remoteUserId,
        {
          params: {
            access_token: user.services.OAuth2Server.accessToken
          }
        }
      );
    },
    fetchMetadata: function (url){
        return HTTP.get(url);
    }
});

JsonRoutes.add("get", "_oauth/OAuth2Server", function (req, res, next) {
    console.log('GET _oauth/OAuth2Server' + req.params);
    
    // JsonRoutes.sendResult(res, {
    //   code: 200,
    //   data: Patients.findOne(id)
    // });
});