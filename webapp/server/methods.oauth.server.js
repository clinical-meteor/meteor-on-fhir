Meteor.methods({
    'getClientForAccount': function (){

      console.log('this.userId', this.userId);
      return oAuth2Server.collections.client.findOne({
        'owner.reference': this.userId
      });
    },
        /**
     * OAUTH FLOW - Step C1.1
     * While you are not required to implement client addition in the same way, clients will have
     * to be available for the oauth2 process to work properly. That may mean running code on
     * Meteor.startup() to populate the db.
     * @param client
     */
    'addClient': function (client){
      check(client, Object);

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
                  'secret': newSecret
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
    'deleteClientApplication': function() {
      console.log('deleteClientApplication');
      return oAuth2Server.collections.client.remove({
        'owner.reference': this.userId
      });
    },

    'getNewClientId': function(){
      return (faker.company.bsAdjective() + "-" + faker.company.bsNoun()).trim();
    }
});
