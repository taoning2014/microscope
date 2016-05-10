Template.postItem.helpers({
  summarize: function(content) {
    var str = content.length > 30 ? content.substr(0, 30) : str;
    return str + '...';
  }
});

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