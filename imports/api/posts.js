import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('Posts');

Meteor.methods({
    'posts.insert'(payload) {
      check(payload.title, String);
      check(payload.description, String);
   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
   
      Posts.insert({
        title: payload.title,
        description: payload.description,
        score: 0,
        createdAt: new Date(),
        userId: this.userId,
        author: Meteor.users.findOne(this.userId).username
      });
    },
    'posts.upVoted'(postId, updateScore) {
      check(postId, String);
      check(updateScore, Number);
   
      Posts.update(postId, { $set: { score: updateScore } });
    },
  });


  if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('posts', function(perPage, sortByKey) {
        const sortedBy = {};
        sortedBy[sortByKey] = -1;
        return Posts.find({}, { sort: sortedBy});
    });

    Meteor.publish('userInfo', function() {
      return Meteor.users.find(
        {
          _id: this.userId
        },
        {
          fields: {'other': 1, 'things': 1}
        }
      );
    });
  }