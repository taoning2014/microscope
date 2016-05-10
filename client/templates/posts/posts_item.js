Template.postItem.helpers({
  // ownPost: function() {
  //   return this.userId == Meteor.userId();
  // },
  // upvotedClass: function() {
  //   var userId = Meteor.userId();
  //   if (userId && !_.include(this.upvoters, userId)) {
  //     return 'btn-primary upvotable';
  //   } else {
  //     return 'disabled';
  //   }
  // },
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