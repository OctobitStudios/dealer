'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Room Schema
 */
var RoomSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill in a room name',
        trim: true
    },
    /**
     * The current players/users
     */
    players: {
        type: Array
    },
    /**
     * All the users who have ever joined the room
     */
    members: {
        type: Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: String,
        required: 'You must be logged in to create a room'
    }
});

/**
 * Find the rooms a user belongs to
 */
RoomSchema.statics.findUserRooms = function(userId, callback){
    var _this = this;

    _this
        .find({members: userId})
        .exec(callback);
};

mongoose.model('Room', RoomSchema);