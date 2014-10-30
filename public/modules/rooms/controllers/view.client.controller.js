'use strict';

angular.module('rooms').controller('ViewController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rooms',
	function($scope, $stateParams, $location, Authentication, Rooms) {
        $scope.user = Authentication.user;

        // If a user is not signed in then redirect to the sign in page.
        if (!$scope.user) $location.path('/signin');

        // Get the room to view.
        $scope.room = Rooms.get({roomId: $stateParams.roomId});

        // Called by the new invite members dialog to invite members to the room
        $scope.inviteMembers = function() {

        }
	}
]);