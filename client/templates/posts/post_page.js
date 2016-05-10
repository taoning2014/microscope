Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postPage.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});

Template.postPage.events({
  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);
  }
});