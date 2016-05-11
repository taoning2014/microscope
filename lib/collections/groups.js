Groups = new Meteor.Collection('groups');

Groups.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

// Meteor.methods({
//     joinGroup: function() {
//         check(this.userId, String);
//         console.log('this.userId');
//         console.log(this.userId);
//         var affected = Groups.update({
//             _id: this._id,
//             members: { $ne: this.userId }
//         }, {
//             $addToSet: { members: this.userId }
//         });

//         if (!affected)
//             throw new Meteor.Error('invalid', "You weren't able to join this group");
//     },

//     leaveGroup: function() {
//         check(this.userId, String);

//         var affected = Groups.update({
//             _id: this._id,
//             members: this.userId
//         }, {
//             $pull: { members: this.userId }
//         });

//         if (!affected)
//             throw new Meteor.Error('invalid', "You weren't able to leave this group");
//     }
// });

GroupsSchema = new SimpleSchema({
    'userId': {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
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
        optional: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpdate) {
                return new Date();
            }
        }
    },
    'picture': {
        type: Object,
        optional: true
    },
    'members': {
        type: [String],
        optional: true,
        autoValue: function() {
            if (this.isInsert) {
                // field is an object, in its value field contents the array
                var membersArray = this.field('members').value;
                if (membersArray.indexOf(Meteor.userId()) < 0) {
                    membersArray.push(Meteor.userId());
                }
                return membersArray;
            }
        }
    },
    'isPrivate': {
        type: Boolean,
        label: 'Is private. If true, the group is invite only',
        optional: true
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
