'use strict';

//Setting up route
angular.module('rooms').config(['$stateProvider',
	function($stateProvider) {
		// Rooms state routing
		$stateProvider.
		state('room', {
			url: '/rooms/:roomId',
			templateUrl: 'modules/rooms/views/view.client.view.html'
		}).
        state('rooms', {
            url: '/rooms',
            templateUrl: 'modules/rooms/views/list.client.view.html'
        });
	}
]);