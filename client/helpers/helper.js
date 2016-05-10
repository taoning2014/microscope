Template.registerHelper('ownPost', function() {
	return this.userId == Meteor.userId();
});

Template.registerHelper('upvotedClass', function(n, thing) {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
});

Template.registerHelper('downvotedClass', function(n, thing) {
    var userId = Meteor.userId();
    if (userId && !_.include(this.downvoters, userId)) {
      return 'btn-primary downvotable';
    } else {
      return 'disabled';
    }
});

Template.registerHelper('summarize', function(content) {
    var str = content.length > 30 ? content.substr(0, 30) : str;
    return str + '...';
});
