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
    created: {
        type: Date,
        expires: 86400,//expire after 24 hours
        default: Date.now
    }
});

mongoose.model('Room', RoomSchema);