angular.module('oic_demo.controllers', [])

.controller('AppCtrl', function($scope, OICService) {
    $scope.oic = OICService;
});
