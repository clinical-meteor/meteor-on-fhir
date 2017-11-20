



//==============================================================================
// TEMPLATE HELPERS


List = {
  save: function(record){
    console.log('List.save');
    var newTask = {
      listId: Session.get('selectedListId'),
      public: true,
      ordinal: 0,
      event: [{
        description: $('#newTaskInput').val(),
        dateTime: new Date()
      }]
    }

    // bump the ordinal of all the tasks
    DiagnosticOrders.find({listId: Session.get('selectedListId')}).forEach(function(task){
      DiagnosticOrders.update({_id: task._id}, {$set: {
        ordinal: task.ordinal + 1
      }})
    });

    console.log('newTask', newTask);

    var result = DiagnosticOrders.insert(newTask);
    console.log('newTask', DiagnosticOrders.findOne({_id: result}));

    Lists.update(record._id, {$inc: {incompleteCount: 1}});
    $('#newTaskInput').val('');

    Session.set('newTaskRibbonVisible', false);
  } ,
  edit: function(list, template) {
    Session.set('editingList', true);

    // wait for the template to redraw based on the reactive change
    Tracker.afterFlush(function() {
      // template.$('.js-edit-form input[type=text]').focus();
      template.$('#checklistTitleForm input[type=text]').focus();
    });
  },
  delete: function(listId, template) {

    console.log('deleteList', listId);
    // ensure the last public list cannot be deleted.
    // if (! list.userId && Lists.find({userId: {$exists: false}}).count() === 1) {
    //   return alert("Sorry, you cannot delete the final public list!");
    // }

    DiagnosticOrders.find({listId: listId}).forEach(function(task) {
      DiagnosticOrders.remove(task._id);
    });
    Lists.remove(listId);

    Router.go('home');
  },
  togglePrivacy: function(list) {
    if (! Meteor.user()) {
      return alert("Please sign in or create an account to make private lists.");
    }

    if (list.userId) {
      Lists.update(list._id, {$unset: {userId: true}});
    } else {
      // ensure the last public list cannot be made private
      if (Lists.find({userId: {$exists: false}}).count() === 1) {
        return alert("Sorry, you cannot make the final public list private!");
      }

      Lists.update(list._id, {$set: {userId: Meteor.userId()}});
    }
  }
}
