'use strict';

angular.module('oic_demo.controllers', [])

.controller('AppCtrl', function(
    // Ionic services
    $ionicModal, $scope, $timeout,

    // Our services
    OICService)
{
    $ionicModal.fromTemplateUrl('templates/modals/discoveringModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.discoveringModal = modal;
    });

    $scope.oicService = OICService;
    $scope.discover = function() {
        $scope.discoveringModal.show().then(function() {
            $scope.oicService.findResources().then(function() {
                $timeout(function() {
                    $scope.discoveringModal.hide();
                }, 1000);
            });
        });
    };

    // Clean up
    $scope.$on('$destroy', function() {
        $scope.discoveringModal.remove();
    });
});
