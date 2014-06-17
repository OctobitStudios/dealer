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
    players: {
        type: Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: String
        //required: 'You must be logged in to create a room'
    }
});

mongoose.model('Room', RoomSchema);