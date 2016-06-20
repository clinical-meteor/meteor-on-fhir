
// list Practitioners
// new practioner
// list Practitioners
// practitioner detail
// edit practitioner
// list Practitioners
// delete practitioner
// list Practitioners


// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['practitioners', 'Practitioners', 'crud', 'fhir'],
  "Sign in.": function (client) {
    client
      .resizeWindow(1200, 1024)
      .url("http://localhost:3000").pause(1200)

  },
  "list Practitioners": function (client) {
    client

  },
  "new practioner": function (client) {
    client

  },
  "list Practitioners": function (client) {
    client

  },
  "practitioner detail": function (client) {
    client

  },
  "edit practitioner": function (client) {
    client
  },
  "list edited Practitioners": function (client) {
    client
  },
  "delete practitioner": function (client) {
    client

  },
  "list non-deleted Practitioners": function (client) {
    client

      .end();
  }
};
