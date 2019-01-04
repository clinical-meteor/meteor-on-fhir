//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var refreshTokensCollection, authCodesCollection, oAuth2Server;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/prime8consulting_meteor-oauth2-server/common.js                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
refreshTokensCollection = new Meteor.Collection('OAuth2RefreshTokens');
refreshTokensCollection.allow({
    insert: function(userId, doc) {
        return Meteor.isServer && userId && userId === doc.userId;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return false;
    },
    remove: function(userId, doc) {
        return userId && userId === doc.userId;
    }
});

authCodesCollection = new Meteor.Collection('OAuth2AuthCodes');
authCodesCollection.allow({
    insert: function(userId, doc) {
        return Meteor.isServer && userId && userId === doc.userId;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return false;
    },
    remove: function(userId, doc) {
        return userId && userId === doc.userId;
    }
});

oAuth2Server = {
    pubSubNames: {
        authCodes: 'oauth2/authCodes',
        refreshTokens: 'oauth2/refreshTokens'
    },
    methodNames: {
        authCodeGrant: 'oauth2/authCodeGrant'
    },
    collections: {
        refreshToken: refreshTokensCollection,
        authCode: authCodesCollection
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/prime8consulting_meteor-oauth2-server/client.js                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
oAuth2Server.subscribeTo = {
    authCode: function() {
        return Meteor.subscribe(oAuth2Server.pubSubNames.authCodes);
    },
    refreshTokens: function() {
        return Meteor.subscribe(oAuth2Server.pubSubNames.refreshTokens);
    }
};

oAuth2Server.callMethod = {
    /**
     *
     * @param client_id : string - The client id.
     * @param redirect_uri : string - The Uri to goto after processing.
     * @param response_type : string - Oauth response type.
     * @param scope : string[] - An array of scopes.
     * @param state : string - A state variable provided by the client. It will be added onto the redirectToUri.
     * @param callback
     */
    authCodeGrant: function(client_id, redirect_uri, response_type, scope, state, callback) {
        Meteor.call(
            oAuth2Server.methodNames.authCodeGrant,
            client_id,
            redirect_uri,
            response_type,
            scope,
            state,
            callback
        );
    }
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("prime8consulting:meteor-oauth2-server", {
  oAuth2Server: oAuth2Server
});

})();
