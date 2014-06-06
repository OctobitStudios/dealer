'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // rooms routes
    var rooms = require('../../app/controllers/rooms');
    app.route('/rooms').post(rooms.addRoom);
    app.route('/rooms/:id').get(rooms.findRoom);
};