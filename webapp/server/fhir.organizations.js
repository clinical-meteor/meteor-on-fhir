


Meteor.methods({
  createOrganization:function(OrganizationObject){
    check(OrganizationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Organization...');
      Organizations.insert(OrganizationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Organization created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeOrganization:function(OrganizationValue, deviceId){
    check(OrganizationValue, Number);
    check(deviceId, String);

    if (Organizations.find().count() === 0) {
      console.log('No records found in Organizations collection.  Lets create some...');

      var defaultOrganization = {
        resourceType: 'Organization',
        status: 'final',
        category: {
          text: 'Weight'
        },
        effectiveDateTime: new Date(),
        subject: {
          display: 'Jane Doe',
          reference: ''
        },
        performer: {
          display: '',
          reference: ''
        },
        device: {
          display: 'Withings Weight Scale',
          reference: deviceId
        },
        valueQuantity: {
          value: OrganizationValue,
          unit: 'kg',
          system: 'http://unitsofmeasure.org'
        }
      };

      Meteor.call('createOrganization', defaultOrganization);
    } else {
      console.log('Organizations already exist.  Skipping.');
    }
  },
  removeOrganizationById: function(organizationId){
    check(organizationId, String);
    Organizations.remove({_id: organizationId});
  },
  dropOrganizations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping Organizations... ');
      Organizations.find().forEach(function(Organization){
        Organizations.remove({_id: Organization._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  syncOrganizations: function(){
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('-----------------------------------------');
      console.log('Syncing organizations... ');
      var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/Organization";
      console.log(queryString);
      
      var result =  HTTP.get(queryString);

      var bundle = JSON.parse(result.content);

      console.log('result', bundle);
      bundle.entry.forEach(function(record){
        console.log('record', record);
        if(record.resource.resourceType === "Organization"){
          if(!Organizations.findOne({name:record.resource.name})){
            Organizations.insert(record.resource);
          }
        }
      });
      Meteor.call('generateDailyStat');
      return true;
    }else {
    console.log('-----------------------------------------');
    console.log('Syncing disabled... ');      
    }

  }
});
