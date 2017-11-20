// wait until tests are in place to refactor
Lists = new Meteor.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};
Lists.createNew = function(){
  var list = {
    name: Lists.defaultName(),
    incompleteCount: 0,
    public: false,
    creator: Meteor.user().emails[0].address,
    userId: Meteor.userId()
  };

  return Lists.insert(list);
}


if (Meteor.isClient){
  Meteor.subscribe('lists');
  Meteor.subscribe('tasks');
}
