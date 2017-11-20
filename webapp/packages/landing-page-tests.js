// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by landing-page.js.
import { name as packageName } from "meteor/clinical:landing-page";

// Write your tests here!
// Here is an example.
Tinytest.add('landing-page - example', function (test) {
  test.equal(packageName, "landing-page");
});
