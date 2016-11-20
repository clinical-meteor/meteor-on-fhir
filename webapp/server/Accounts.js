// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  if(process.env.NODE_ENV === 'test') console.log('-------------------------------');
  if(process.env.NODE_ENV === 'test') console.log('Accounts.onCreateUser');
  // console.log('options', options);
  // console.log('user', user);
  // console.log('Meteor.settings', Meteor.settings);


  // We still want the default hook's 'profile' behavior.
  if (options.profile){
    user.profile = options.profile;


    // some of our test data will be initialized with a profile.role of Physician
    // if so, we want to set their system access to 'practitioner'
    if (options.profile.role === 'Physician') {
      user.roles = ['practitioner'];
      Roles.addUsersToRoles(user._id, ['practitioner']);
    }

    // otherwise, we check whether thay have an access code to grant practitioner access
    if (options.profile.accessCode && Meteor.settings && Meteor.settings.private && Meteor.settings.private.accessCode) {
      if (options.profile.accessCode === Meteor.settings.private.accessCode) {
        if(process.env.NODE_ENV === 'test') console.log('AccessCodes match!  Assigning practitioner role...');

        user.roles = ['practitioner'];
        Roles.addUsersToRoles(user._id, ['practitioner']);
      }
    }
  }

  if(process.env.NODE_ENV === 'test') console.log('user', user);
  return user;
});
