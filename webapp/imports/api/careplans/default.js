export const defaultCarePlan = {
  resourceType: 'CarePlan',
  identifier: [{
    value: 'alcohol-treatment-template',
    type: {
      text: 'Alcohol Treatment AM Template'
    }
  }],
  subject: {
    display: '',
    reference: ''
  },
  status: 'active',
  context: {
    display: '2016-09-20',
    reference: 'Encounters/'
  },
  period: {
    start: new Date(2016, 9, 20),
    end: new Date(2016, 9, 21)
  },
  author: [{
    display: 'DxRx Master Template',
    reference: 'Meteor.users/System'
  }],
  description: 'Alcohol Abuse Disorder Treatment Plan.',
  addresses: [{
    display: 'Alcohol Abuse Disorder',
    reference: 'Conditions/'
  }],
  relatedPlan: [{
    code: 'fullfills',
    plan: {
      display: 'Daily Medication Template',
      reference: 'CarePlans/'
    }
  }],
  participant: [{
    role: {
      text: 'Primary Care Physician'
    },
    member: {
      display: 'Dr. John Mendelson',
      reference: 'Practitioners/'
    }
  }],
  goal: [ {
    display: 'Use the breathalyzer twice a day to monitor alcohol intake.',
    reference: 'Goals/'
  }, {
    display: 'Take your medications as directed to reduce your craving for alcohol.',
    reference: 'Goals/'
  }, {
    display: 'Use the app twice a day to record your actions and alcohol intake.',
    reference: 'Goals/'
  }],
  activity: [{
    reference: {
      display: 'AM Breathalyzer Observation',
      reference: 'Observation/'
    },
    detail: {
      category: {
        text: 'action'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'
      }],
      goal: [{
        display: 'Develop awareness of your drinking behaviors.',
        reference: 'Goals/'
      }],
      status: 'planned',
      prohibited: false,
      scheduledTiming: {
        resoureceType: 'Timing',
        code: {
          text: 'AM'
        }
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'
      }],
      quantity: {
        value: 1,
        unit: 'exhalations'
      },
      description: 'Check your blood alcohol level in the morning.'
    }
  }, {
    reference: {
      display: 'PM Breathalyzer Observation',
      reference: 'Observation/'
    },
    detail: {
      category: {
        text: 'action'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'
      }],
      goal: [{
        display: 'Develop awareness of your drinking behaviors.',
        reference: 'Goals/'
      }],
      status: 'planned',
      prohibited: false,
      scheduledTiming: {
        resoureceType: 'Timing',
        code: {
          text: 'PM'
        }
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'
      }],
      quantity: {
        value: 1,
        unit: 'exhalations'
      },
      description: 'Check your blood alcohol level in the evening.'
    }
  }, {
    reference: {
      display: 'Avoid hard alcohol.',
      reference: ''
    },
    detail: {
      category: {
        text: 'drug'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'
      }],
      goal: [{
        display: 'Lower your weekly average alcohol intake compared to your baseline.',
        reference: 'Goals/'
      }],
      status: 'planned',
      prohibited: true,
      scheduledPeriod: {
        start: new Date(2016, 9, 20),
        end: new Date(2016, 9, 21)
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'
      }],
      productReference: {
        display: 'Alcohol',
        reference: 'Medications/'
      },
      dailyAmount: {
        value: 250,
        comparator: '>',
        unit: 'ml',
        system: 'http://unitsofmeasure.org'
      },
      quantity: {
        value: 20,
        comparator: '>',
        unit: '%',
        system: 'http://unitsofmeasure.org'
      },
      description: 'Begin reducing alcohol consumption by eliminating hard alcohol.'
    }
  }]
};
