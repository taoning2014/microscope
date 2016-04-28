Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
  	return Meteor.subscribe('posts');
  }
});

Router.route('/', {name: 'postsList'});