'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Room Schema
 */
var RoomSchema = new Schema({
    /**
     * The room name
     */
    name: {
        type: String,
        required: 'Please fill in a room name',
        trim: true
    },
    description: {
        type: String
    },
    /**
     * All the users who have ever joined the room
     */
    members: [
        {
            userId: {type: Schema.Types.ObjectId, ref: 'User' },
            active: Boolean // Is the user active in the room
        }
    ],
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'You must be logged in to create a room'
    }
});

/**
 * Find the rooms a user belongs to
 */
RoomSchema.statics.findUserRooms = function(userId, callback){
    this.find({"members.userId": userId})
        .exec(callback);
};

mongoose.model('Room', RoomSchema);