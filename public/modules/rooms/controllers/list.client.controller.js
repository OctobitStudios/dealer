'use strict';

angular.module('rooms').controller('ListController', ['$scope', '$location', 'Authentication', 'Rooms',
	function($scope, $location, Authentication, Rooms) {
        $scope.user = Authentication.user;

        // If a user is not signed in then redirect to the sign in page.
        if (!$scope.user) $location.path('/signin');

        // Get the rooms to show in the list.
        $scope.hasRooms = false;
        Rooms.query().$promise.then(function(rooms) {
            $scope.rooms = rooms;
            $scope.hasRooms = rooms && rooms.length > 0;
        });

        // Create a new room for use by the new room dialog.
        $scope.room = {
            name: ''
        };

        // Called by the new room dialog to create the room.
        $scope.createRoom = function() {
            // TODO Validate form

            Rooms.save($scope.room, function(room) {
                // Hide the dialog.
                $('#new-room-dialog').modal('hide');

                // Reset the new room to the defaults.
                $scope.room = {
                    name: ''
                };

                // Redirect to the newly created room.
                $location.path('/rooms/' + room._id);
            });
        };

        // Called from the room options menu
        $scope.deleteRoom = function(room){
            var roomId = room._id;
            Rooms.delete({roomId: roomId}, function(){
                $scope.rooms = jQuery.grep($scope.rooms, function(r) {
                    return r._id !== roomId;
                });
            });
        };
	}
]);