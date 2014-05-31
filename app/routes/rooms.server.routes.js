'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // User Routes
    var rooms = require('../../app/controllers/rooms');
    app.route('/rooms').post(rooms.addRoom);
};