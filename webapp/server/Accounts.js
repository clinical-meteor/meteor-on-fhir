// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  if(process.env.NODE_ENV === 'test') console.log('------------------------------------------------');
  if(process.env.NODE_ENV === 'test') console.log('Accounts.onCreateUser');
  if(process.env.NODE_ENV === 'test') console.log('Meteor.settings', Meteor.settings);
  if(process.env.NODE_ENV === 'test') console.log('options', options);

  // console.log('options', options);
  // console.log('user', user);
  // console.log('Meteor.settings', Meteor.settings);


  // We still want the default hook's 'profile' behavior.
  if (options.profile){
    console.log("options.profile exists");

    user.profile = options.profile;
    user.profile.firstTimeVisit = true;
    user.roles = [];


    // some of our test data will be initialized with a profile.role of Physician
    // if so, we want to set their system access to 'practitioner'
    if (options.profile.role === 'Physician') {
      user.roles = ['practitioner'];
      Roles.addUsersToRoles(user._id, ['practitioner']);
    }

    // otherwise, we check whether thay have an access code to grant practitioner access
    if (options.profile.accessCode && Meteor.settings && Meteor.settings.private && Meteor.settings.private.practitionerAccessCode) {
      if (options.profile.accessCode === Meteor.settings.private.practitionerAccessCode) {
        if(process.env.NODE_ENV === 'test') console.log('AccessCodes match!  Assigning practitioner role...');

        user.roles = ['practitioner'];
        Roles.addUsersToRoles(user._id, ['practitioner']);
      }
    }

    // also check for admin access
    if (options.profile.accessCode) {
      if(process.env.NODE_ENV === 'test') console.log("options.profile.accessCode exists");

      if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.sysadminAccessCode) {
      if(process.env.NODE_ENV === 'test') console.log("Meteor.settings.private.sysadminAccessCode exists");

        if (options.profile.accessCode === Meteor.settings.private.sysadminAccessCode) {
          if(process.env.NODE_ENV === 'test') console.log('AccessCodes match!  Assigning sysadmin role...');

          user.roles = ['sysadmin'];
          Roles.addUsersToRoles(user._id, ['sysadmin']);
        }
      }
    }

    // if no other roles have been assigned, make the new user a patient
    if (user.roles.length === 0) {
      user.roles.push('patient');
      Roles.addUsersToRoles(user._id, ['patient']);
    }
  }

  if(process.env.NODE_ENV === 'test') console.log('modified user', user);


  return user;
});
