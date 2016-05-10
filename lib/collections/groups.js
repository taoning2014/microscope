Groups = new Meteor.Collection('groups');

Groups.allow({
    insert: function(userId, doc) {
        return !!userId;
    }
});

// Groups.allow({
//   update: function(userId, post) { return ownsDocument(userId, post); },
//   remove: function(userId, post) { return ownsDocument(userId, post); },
// });

// Groups.deny({
//   update: function(userId, post, fieldNames) {
//     // may only edit the following two fields:
//     return (_.without(fieldNames, 'content', 'title').length > 0);
//   }
// });

// Groups.deny({
//   update: function(userId, post, fieldNames, modifier) {
//     var errors = validatePost(modifier.$set);
//     return errors.title || errors.content;
//   }
// });

GroupsSchema = new SimpleSchema({
    'userId': {
        type: String,
        autoValue: function() {
            try {
                if (this.isInsert) {
                    return Meteor.userId();
                }
            } catch (e) {
                return "";
            }
        }
    },
    'groupName': {
        type: String
    },
    'discription': {
        type: String
    },
    'createdAt': {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    'updatedAt': {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    },
    'picture': {
        type: Object,
        optional: true
    },
    'members': {
        type: [String],
        optional: true
    },
    'isPrivate': {
        type: Boolean,
        label: 'Is private. If true, the group is invite only'
    },
    'isPublic': {
        type: Boolean,
        label: 'Is public. If its false, it means the group is not “published” to the public website, so nobody can see it on the groups list page.',
        optional: true
    },
    'isFeatured': {
        type: Boolean,
        label: 'Is featured. Only set by admins, this determines if the group makes our front page/featured section.',
        optional: true
    }
});

Groups.attachSchema(GroupsSchema);

// Groups.allow({
//     insert: function(userId, doc) { return isBlogContributor(userId); },
//     update: function(userId, doc) { return (userId === doc.createdBy || isBlogAdmin(userId)); },
//     remove: function(userId, doc) {
//        return (userId === doc.createdBy || isBlogAdmin(userId));
//     }
// });
