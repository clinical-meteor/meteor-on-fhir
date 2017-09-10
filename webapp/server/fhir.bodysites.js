


Meteor.methods({
  createBodySite:function(bodySiteObject){
    check(bodySiteObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating BodySite...');
      BodySites.insert(bodySiteObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('BodySite created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeBodySite:function(bodySiteValue, deviceId){
    check(bodySiteValue, Number);
    check(deviceId, String);

    if (BodySites.find().count() === 0) {
      console.log('No records found in BodySites collection.  Lets create some...');

      var defaultBodySite = {
        resourceType: 'BodySite',
        // status: 'final',
        // category: {
        //   text: 'Weight'
        // },
        // effectiveDateTime: new Date(),
        // subject: {
        //   display: 'Jane Doe',
        //   reference: ''
        // },
        // performer: {
        //   display: '',
        //   reference: ''
        // },
        // device: {
        //   display: 'Withings Weight Scale',
        //   reference: deviceId
        // },
        // valueQuantity: {
        //   value: bodySiteValue,
        //   unit: 'kg',
        //   system: 'http://unitsofmeasure.org'
        // }
      };

      // if (this.userId) {
      //   let user = Meteor.users.findOne({_id: this.userId});
      //   if (user && user.profile && user.profile.name && user.profile.name.text) {

      //     //   display: Patients.findByUserId(this.userId).fullName(),
      //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

      //     defaultBodySite.subject.display = user.profile.name.text;
      //     defaultBodySite.subject.reference = 'Meteor.users/' + this.userId;

      //     defaultBodySite.performer.display = user.profile.name.text;
      //     defaultBodySite.performer.reference = 'Meteor.users/' + this.userId;
      //   }
      // }

      Meteor.call('createBodySite', defaultBodySite);
    } else {
      console.log('BodySites already exist.  Skipping.');
    }
  },
  removeBodySiteById: function(bodySiteId){
    check(bodySiteId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing bodySite... ');
      BodySites.remove({_id: bodySiteId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropBodySites: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping bodySites... ');
      BodySites.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
