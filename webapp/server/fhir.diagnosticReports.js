


Meteor.methods({
  createDiagnosticReport:function(diagnosticReportObject){
    check(diagnosticReportObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating DiagnosticReport...');
      DiagnosticReports.insert(diagnosticReportObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('DiagnosticReport created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeDiagnosticReport:function(diagnosticReportValue, deviceId){
    check(diagnosticReportValue, Number);
    check(deviceId, String);

    if (DiagnosticReports.find().count() === 0) {
      console.log('No records found in DiagnosticReports collection.  Lets create some...');

      var defaultDiagnosticReport = {
        resourceType: 'DiagnosticReport',
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
        //   value: diagnosticReportValue,
        //   unit: 'kg',
        //   system: 'http://unitsofmeasure.org'
        // }
      };

      // if (this.userId) {
      //   let user = Meteor.users.findOne({_id: this.userId});
      //   if (user && user.profile && user.profile.name && user.profile.name.text) {

      //     //   display: Patients.findByUserId(this.userId).fullName(),
      //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

      //     defaultDiagnosticReport.subject.display = user.profile.name.text;
      //     defaultDiagnosticReport.subject.reference = 'Meteor.users/' + this.userId;

      //     defaultDiagnosticReport.performer.display = user.profile.name.text;
      //     defaultDiagnosticReport.performer.reference = 'Meteor.users/' + this.userId;
      //   }
      // }

      Meteor.call('createDiagnosticReport', defaultDiagnosticReport);
    } else {
      console.log('DiagnosticReports already exist.  Skipping.');
    }
  },
  removeDiagnosticReportById: function(diagnosticReportId){
    check(diagnosticReportId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing diagnosticReport... ');
      DiagnosticReports.remove({_id: diagnosticReportId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropDiagnosticReports: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping diagnosticReports... ');
      DiagnosticReports.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
