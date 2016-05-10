Template.groupItem.events({
  'click .joinableClass': function(e) {
    e.preventDefault();
    Meteor.call('joinGroup', this._id);
  }
});

Template.groupItem.events({
  'click .leavableClass': function(e) {
    e.preventDefault();
    Meteor.call('leaveGroup', this._id);
  }
});