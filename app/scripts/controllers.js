'use strict';

angular.module('oic_demo.controllers', [])

.controller('AppCtrl', function(
    // Ionic services
    $ionicModal, $scope, $timeout,

    // Our services
    OICService, SettingsService)
{
    // Modals
    $ionicModal.fromTemplateUrl('templates/modals/discoveringModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.discoveringModal = modal;
    });

    // Scope objects
    $scope.oicService = OICService;

    // Scope functions
    $scope.discover = function() {
        $scope.discoveringModal.show().then(function() {
            var options = {
                deviceId: SettingsService.settings.resourceDiscovery.deviceId,
                resourcePath: SettingsService.settings.resourceDiscovery.resourcePath,
                resourceType: SettingsService.settings.resourceDiscovery.resourceType
            };
            $scope.oicService.findResources(options).then(function() {
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
})

.controller('SettingsController', function($scope, SettingsService) {
    $scope.settingsService = SettingsService;
});
