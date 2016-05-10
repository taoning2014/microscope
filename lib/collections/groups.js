Groups = new Meteor.Collection('groups');

GroupsSchema = new SimpleSchema({
    'userId': {
        type: String
    },
    'groupName': {
        type: String
    },
    'createdAt': {
        type: Date,
    },
    'updatedAt': {
        type: Date,
        optional: true
    },
    'picture': {
        type: Object,
        optional: true
    },
    'memberCount': {
        type: Number,
        optional: true
    },
    'members': {
        type: [String],
        optional: true
    },
    'isPrivate': {
        type: Boolean,
        optional: true
    },
    'isPublic': {
        type: Boolean,
        optional: true
    },
    'isFeatured': {
        type: Boolean,
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