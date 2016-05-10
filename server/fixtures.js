// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [], upvotes: 0,
    downvoters: [], downvotes: 0
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });
  
  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], upvotes: 0,
    downvoters: [], downvotes: 0
  });
  
  Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], upvotes: 0,
    downvoters: [], downvotes: 0
  });
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.i',
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [], upvotes: 0,
      downvoters: [], downvotes: 0
    });
  }

  for (var i = 0; i < 5; i++) {
    Groups.insert({
      userId: sacha._id,
      groupName: "Test Regular Group: " + i,
      createdAt: new Date(now - 12 * 3600 * 1000 * i),
      memberCount: 2,
      members: [sacha._id, tom._id],
      isPrivate: false,
      isPublic: true,
      isFeatured: false
    });
  }

  for (var i = 0; i < 2; i++) {
    Groups.insert({
      userId: tom._id,
      groupName: "Test Private Group: " + i,
      createdAt: new Date(now - 12 * 3600 * 1000 * i),
      memberCount: 1,
      members: [tom._id],
      isPrivate: true,
      isPublic: true,
      isFeatured: false
    });
  }

  for (var i = 0; i < 2; i++) {
    Groups.insert({
      userId: sacha._id,
      groupName: "Test Featured Group: " + i,
      createdAt: new Date(now - 12 * 3600 * 1000 * i),
      memberCount: 2,
      members: [sacha._id, tom._id],
      isPrivate: false,
      isPublic: true,
      isFeatured: true
    });
  }
}