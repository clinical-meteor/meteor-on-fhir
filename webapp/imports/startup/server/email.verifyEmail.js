import { Accounts } from 'meteor/accounts-base';
import { get } from 'lodash';


Accounts.emailTemplates.siteName = 'Symptomatic';
Accounts.emailTemplates.from = 'Symptomatic <catherder@symptomatic.io>';

Accounts.urls.verifyEmail = function(token) {
  return Meteor.absoluteUrl("signin?token=" + token)
};

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "Activate your account now!";
    },
    text(user, url) {
        return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
    }
};

