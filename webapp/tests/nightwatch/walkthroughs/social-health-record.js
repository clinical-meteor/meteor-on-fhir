

module.exports = {
  tags: ['social', 'healthrecord', 'healthlog'],
  'user can log in/out' : function (client) {
    client
  },

  'user can log in/out' : function (client) {
    client
  },

  // verification test
  'PatientId can be attached to user account' : function (client) {
    client
  },

  // verification test
  'PractitionerId can be attached to user account' : function (client) {
    client
  },


  // Patient.practitioners[]
  'patient can search practitioners' : function (client) {
    client
  },

  'patient can request practitioner be added to Patient.practitioners = []' : function (client) {
    client
  },

  'patient displays on practitioners notification channel' : function (client) {
    client
  },

  'practitioner can approve being added to Patient.practitioners = []' : function (client) {
    client
  },



  // Practitioner.patients[]
  'practitioners can search patients' : function (client) {
    client
  },
  'practitioners can request patient be added to Practitioner.patients[]' : function (client) {
    client
  },
  'practitioner displays on patients notification channel' : function (client) {
    client
  },
  'patient can approve being added to Practitioner.patients[]' : function (client) {
    client
  },



  // PEER TO PEER CAREWATCH
  'patients can search patients' : function (client) {
    client
  },
  'patient can request user be added to Patient.carewatch = []' : function (client) {
    client
  },
  'patient displays on users notification channel' : function (client) {
    client
  },
  'User can approve being added to Patient.carewatch = []' : function (client) {
    client
  },
  'practitioner can request user be added to Practitioner.carewatch = []' : function (client) {
    client
  },
  'practitioner displays on users notification channel' : function (client) {
    client
  },
  'User can approve being added to Practitioner.carewatch = []' : function (client) {
    client
  },


  'end' : function (client) {
    client
      .end();
  }
};












// Patient.guardians = []
// Patient.dependents = []
// Patient.carewatch = []

// Practitioner.dependents = []
// Practitioner.guardians = []
// Practitioner.carewatch  = []

// Patient.practitioners = []
// Practitioner.patients = []
