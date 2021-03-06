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
    console.log('Creating new room for user ' + JSON.stringify(req.user));
    var roomConfig = _.defaults({
            creator: req.user._id,
            members: [
                {
                    user: req.user._id,
                    active: true
                }
            ]
        }, req.body),
        room = new Room(roomConfig);

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

/**
 * Add a new room
 */
exports.deleteRoom = function(req, res){
    //check parameters
    if(!req.params.id){
        throw new Error('A room id is required');
    }
    return Room.findByIdAndRemove(req.params.id, function (err, room) {
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
        throw new Error('A room id is required');
    }
    return Room.findById(req.params.id)
        .populate('creator members.user', '_id firstName lastName displayName email')
        .exec(function (err, room) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(room);
        }
    });
};

exports.joinRoom = function(req, res){
    //check parameters
    if(!req.params.id){
        throw new Error('Cannot join a room without a room id');
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

/**
 * Gets all the rooms that the user has participated in
 * @param req
 * @param res
 */
exports.getRooms = function(req, res){
    console.log('Getting rooms for ' + req.user._id);
    Room.findUserRooms(req.user._id, function(err, rooms){
       if(err){
           console.log(err);
           res.json([]);
       }
       else {
           console.log('found rooms ' + JSON.stringify(rooms));
           res.json(rooms);
       }
    });
};


