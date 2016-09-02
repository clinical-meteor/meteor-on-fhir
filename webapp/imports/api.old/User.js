


export default class User {
  constructor(document) {
    if (document) {
      Object.assign(this, document);
    }
  }

  /**
   * @summary The personal name of the user account.
   * @memberOf User
   * @name userName
   * @version 1.2.3
   * @returns {String} A name representation of the user account
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.userName());
   * ```
   */
  userName() {
    return this.isSelf() ? "You" : this.username;
  }
  isTrue() {
    return true;
  }

  /**
   * @summary Gets the full name of the user.
   * @memberOf User
   * @name fullName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.fullName());
   * ```
   */
  fullName() {
      // if we're using an HL7 FHIR HumanName resource
    if (this.profile && this.profile.name && this.profile.name.text){
      // the following assumes a Person, RelatedPerson, or Practitioner resource
      // which only has a single name specified
      return this.profile.name.text;
    } else if (this.profile && this.profile.name){
      // the following assumes a Patient resource
      // where multiple names and aliases may be specified
      return this.profile.name[0].text;

      // if we're using traditional Meteor naming convention
    } else if (this.profile && this.profile.fullName){
      return this.profile.fullName;
    } else {
      return "---";
    }
  }


  /**
   * @summary Gets the given (first) name of the user.
   * @memberOf User
   * @name givenName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.givenName());
   * ```
   */
  givenName() {
    if(this.profile && this.profile.name){
      // if we're using an HL7 FHIR HumanName resource
      return this.profile.name[0].given;
    } else if (this.profile && this.profile.fullName){
      // if we're using traditional Meteor naming convention
      var names = this.profile.fullName.split(" ");
      return names[0];
    } else {
      return "";
    }
  }


  /**
   * @summary Gets the family (last) name of the user.
   * @memberOf User
   * @name familyName
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.familyName());
   * ```
   */
  familyName() {
    if (this.profile && this.profile.name) {
      // if we're using an HL7 FHIR HumanName resource
      return this.profile.name[0].family;
    } else if (this.profile && this.profile.fullName){
      // if we're using traditional Meteor naming convention
      var names = this.profile.fullName.split(" ");
      return names[names.length - 1];
    } else {
      return "---";
    }
  }

  /**
   * @summary Gets the default email that an account is associated.  Defined as the first verified email in the emails array.
   * @memberOf User
   * @name defaultEmail
   * @version 1.2.3
   * @returns {String}
   * @example
   * ```js
   * var selectedUser = Meteor.users.findOne({username: "janedoe"});
   * console.log(selectedUser.defaultEmail());
   * ```
   */
  defaultEmail() {
    return this.emails && this.emails[0].address;
  }


  /**
   * Get the default email address for the user
   * @method defaultEmail
   * @returns {String} The users default email address
   */
  getEmails() {

    var result = [];

    if (this && this.emails) {
      this.emails.forEach(function (email) {
        result.push(email.address);
      });
    }

    if (this.services && this.services.google && this.services.google.email) {
      result.push(this.services.google.email);
    }

    if (result.length > 0){
      return result;
    } else {
      return [];
    }
  }


  getPrimaryEmail() {
    if (this.emails) {
      return this.emails[0].address;
    } else {
      return "---";
    }
  }
}
