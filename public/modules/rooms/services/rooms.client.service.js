'use strict';

// Rooms service used for communicating with the rooms REST endpoint
angular.module('rooms').factory('Rooms', ['$resource',
	function($resource) {
        return $resource('rooms/:roomId', {}, {
            update: {
                method: 'PUT'
            }
        });
	}
]);