'use strict';

module.exports = function(app) {
    // rooms routes
    var rooms = require('../../app/controllers/rooms'),
        authentication = require('../middleware/authentication'),
        passport = require('passport');

    app.route('/rooms').get(authentication.requiresLogin, rooms.getRooms);
    app.route('/rooms').post(authentication.requiresLogin, rooms.addRoom);
    app.route('/rooms/:id').get(rooms.findRoom);

    // api for testing
    app.route('/api/rooms').get(passport.authenticate('basic'), rooms.getRooms);
    app.route('/api/rooms').post(passport.authenticate('basic'), rooms.addRoom);
    app.route('/api/rooms/:id').get(passport.authenticate('basic'), rooms.findRoom);
};