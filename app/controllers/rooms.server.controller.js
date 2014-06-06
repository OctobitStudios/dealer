'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    Room = mongoose.model('Room'),
    _ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
                break;
            case 11001:
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Add a new room
 */
exports.addRoom = function(req, res){
    // Init Variables
    var room = new Room(req.body);
    var message = null;

    // Save the room
    room.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(room);
        }
    });
};

exports.findRoom = function(req, res){
    //check parameters
    if(!req.params.id){
        throw new Error('Cannot find a room without an id');
    }
    return Room.findById(req.params.id, function (err, room) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(room);
        }
    });
};


