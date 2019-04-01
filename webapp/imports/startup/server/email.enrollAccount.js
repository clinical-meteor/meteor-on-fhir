
import { get } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Accounts.emailTemplates.siteName = 'Symptomatic';
Accounts.emailTemplates.from = 'Symptomatic <catherder@symptomatic.io>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
    // return `Welcome to Symptomatic, ${user.profile.name}`;
    return `Welcome to Symptomatic`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return 'Thank you for deciding to sign up. To activate your account, simply click the link below:\n\n' + url;
};

Accounts.emailTemplates.enrollAccount = {
  subject(user) {
    // return `Welcome to Symptomatic, ${user.profile.name}`;
    return `Welcome to Symptomatic`;
  },
  text(user, url) {
      return 'Thank you for deciding to sign up. To activate your account, simply click the link below:\n\n' + url;
      // return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
  }
};

Accounts.urls.enrollAccount = function(token) {
  return Meteor.absoluteUrl("signin?token=" + token)
};