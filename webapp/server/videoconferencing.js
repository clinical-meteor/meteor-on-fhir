import OpenTok from 'opentok';
import { get } from 'lodash';

var opentok;
if(get(Meteor.settings, 'private.credentials.tokbox.apiKey')){
  opentok = new OpenTok(
    get(Meteor.settings, 'private.credentials.tokbox.apiKey'), 
    get(Meteor.settings, 'private.credentials.tokbox.secret'), 
  );
}

// tokbox
Meteor.methods({ 
  establishTokboxSession: function() { 
     console.log('establishTokboxSession')

     var userId = this.userId;
     console.log('userId', userId);

     if(opentok){

      var userSessionId = opentok.createSession(Meteor.bindEnvironment(function(err, session) {
        if (err) return console.log(err);

        console.log('session.sessionId', session.sessionId);
        
        // save the sessionId 
        Meteor.users.update({_id: userId}, {$set: {
          'profile.tokbox.sessionId': session.sessionId
        }});
      }));

     } else {
       console.log('opentok not defined; is the API and secret set in the settings.json file?')
     }
  },
  generateTokboxToken: function() { 
    console.log('generateTokboxToken')

    if(opentok){

      var currentUser = Meteor.users.findOne(this.userId);
      if(get(currentUser, 'profile.tokbox.sessionId')){
        var token = opentok.generateToken(get(currentUser, 'profile.tokbox.sessionId'));
        console.log('token', token);        

        // save the token 
        Meteor.users.update({_id: this.userId}, {$set: {
          'profile.tokbox.token': token
        }});
        
      } else {
        console.log('profile.tokbox.sessionId doest exist.  Have you established a session with the server?')
      }
    } else {
      console.log('opentok not defined; is the API and secret set in the settings.json file?')
    }
 },
 endTokboxSession: function(){
   console.log('endTokboxSession');

   if(opentok){
    
      var currentUser = Meteor.users.findOne(this.userId);
      if(get(currentUser, 'profile.tokbox.sessionId')){
        // force disconnect
        opentok.forceDisconnect(get(currentUser, 'profile.tokbox.sessionId'), null, function(){

        });

        // remove the sessionId
        Meteor.users.update({_id: this.userId}, {$unset: {
          'profile.tokbox.sessionId': "",
          'profile.tokbox.token': "",
        }});
        
      } else {
        console.log('profile.tokbox.sessionId doest exist.  Have you established a session with the server?')
      }
    } else {
      console.log('opentok not defined; is the API and secret set in the settings.json file?')
    }

 }
});



// Notifications
Meteor.methods({ 
  createUserNotification: function(userId, notification) { 

    console.log('userId', userId);

    if(!notification){
      notification = {
        primaryText: '',
        secondaryText: ''
      }
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.notifications': [{
        primaryText: notification.primaryText,
        secondaryText: notification.secondaryText,
        type: 'notice'
      }]
    }});
  }, 
  videocallUser: function(callee, token) { 
    check(callee, Object);
    check(token, String);

    console.log('this.userId', this.userId);
    var user = Meteor.users.findOne(this.userId);
    
    console.log('callee', callee);

    var newNotification = {
      primaryText: '',
      secondaryText: '',
      token: '',
      type: 'videocall'
    }

    if(get(callee, 'profile.name.text')){
      newNotification.primaryText = get(user, 'profile.name.text');
    }
    if(get(callee, 'emails[0].address')){
      newNotification.secondaryText = get(user, 'emails[0].address');      
    }
    if(get(callee, 'emails[0].address')){
      newNotification.secondaryText = get(user, 'emails[0].address');      
    }
    if(token){
      newNotification.token = token;
    }

    Meteor.users.update({_id: callee._id}, {$addToSet: {
      'profile.notifications': newNotification
    }});
    
  }     
});