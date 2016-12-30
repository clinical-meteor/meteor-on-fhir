Meteor.methods({
    /**
     * OAUTH FLOW - Step C1.1
     * While you are not required to implement client addition in the same way, clients will have
     * to be available for the oauth2 process to work properly. That may mean running code on
     * Meteor.startup() to populate the db.
     * @param client
     */
    'addClient': function (client){
        console.log('addClient', client);
        oAuth2Server.collections.client.upsert(
            {
                clientId: client.clientId
            },
            {
                $set: client
            }
        );
    },


    'changeSecret': function (client, newSecret){
        console.log('changeSecret', client);
        oAuth2Server.collections.client.upsert(
            {
                clientId: client.clientId
            },
            {
                $set: {
                  'clientSecret': newSecret
                }
            }
        );
    },

    /**
     * Exists purely for testing purposes.
     * @returns {any}
     */
    'clientCount': function() {
      var user = Meteor.users.findOne({_id: this.userId});
      if (user.username === "sysadmin") {
        return oAuth2Server.collections.client.find({}).count();
      } else {
        return oAuth2Server.collections.client.find({
          'owner.reference': this.userId
        }).count();
      }
    },

    /**
     * Exists purely for testing purposes.
     */
    'deleteAllClients': function() {
        oAuth2Server.collections.client.remove({});
    },

    /**
     * Allows user to delete their account
     */
    'deleteClient': function(accountId) {
        oAuth2Server.collections.client.remove({_id: accountId});
    },

    'getNewClientId': function(){
      return (faker.company.bsAdjective() + "-" + faker.company.bsNoun()).trim();
    }
});
