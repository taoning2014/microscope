Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'content', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.content;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";
  
  if (!post.content)
    errors.content =  "Please fill in a content";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      content: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.title || errors.content)
      throw new Meteor.Error('invalid-post', "You must set a title and content for your post");
    
    var postWithSameLink = Posts.findOne({title: postAttributes.title});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [], 
      upvotes: 0,
      downvoters: [], 
      downvotes: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {upvotes: 1}
    });
    
    // if this voter vote down on this post before, remove it from downvoters and downvotes
    Posts.update({
      _id: postId, 
      downvoters: this.userId
    }, {
      $inc: {downvotes: -1},
      $pull: {downvoters: this.userId}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },

  downvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      downvoters: {$ne: this.userId}
    }, {
      $addToSet: {downvoters: this.userId},
      $inc: {downvotes: 1}
    });
    
    // if this voter vote up on this post before, remove it from upvoters and upvotes
    Posts.update({
      _id: postId, 
      upvoters: this.userId
    }, {
      $inc: {upvotes: -1},
      $pull: {upvoters: this.userId}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to downvote that post");
  }
});