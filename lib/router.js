var PostsListController;
var NewPostsController;
var BestPostsController;

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit, 10) || this.increment;
  },
  findOptions: function() {
    return { sort: this.sort, limit: this.postsLimit() };
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: { submitted: -1, _id: -1 },
  nextPath: function() {
    return Router.routes.newPosts.path({ postsLimit: this.postsLimit() + this.increment });
  }
});

BestPostsController = PostsListController.extend({
  sort: { votes: -1, submitted: -1, _id: -1 },
  nextPath: function() {
    return Router.routes.bestPosts.path({ postsLimit: this.postsLimit() + this.increment });
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', { name: 'newPosts' });

Router.route('/best/:postsLimit?', { name: 'bestPosts' });


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/submit', { name: 'postSubmit' });

// ================ Groups routes================
Router.route('/groups/groupsList', {
  name: 'groupsList',
  waitOn: function() {
    return Meteor.subscribe('groups');
  },
  data: function() {
    return {
      groups: Groups.find()
    };
  }
});

Router.route('/groups/groupPage/:_id', {
  name: 'groupPage',
  waitOn: function() {
    return Meteor.subscribe('singleGroup', this.params._id);
  },
  data: function() {
    return Groups.findOne(this.params._id);
  }
});

Router.route('/groups/groupCreate', {
  name: 'groupCreate'
});

Router.route('/groups/groupEdit/:_id', {
  name: 'groupEdit',
  waitOn: function() {
    return Meteor.subscribe('singleGroup', this.params._id);
  },
  data: function() {
    return Groups.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound', { only: 'postPage' });
Router.onBeforeAction(requireLogin, { only: 'postSubmit' });
