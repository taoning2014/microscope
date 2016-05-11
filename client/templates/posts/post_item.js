Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});

Template.postItem.events({
  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);
  }
});