'use strict'; 
angular.module('oic_demo.controllers', [])

.controller('AppController', function(
    // Ionic services
    $ionicModal, $rootScope, $scope, $timeout,

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

    // Scope functions
    $scope.discover = function() {
        $scope.discoveringModal.show().then(function() {
            OICService.findDevices().then(function() {
                var options = {
                    deviceId: SettingsService.settings.resourceDiscovery.deviceId,
                    resourcePath: SettingsService.settings.resourceDiscovery.resourcePath,
                    resourceType: SettingsService.settings.resourceDiscovery.resourceType
                };
                OICService.findResources(options).then(function() {
                    $timeout(function() {
                        $scope.discoveringModal.hide();
                    }, 1000);
                });
            });
        });
    };

    // Clean up
    $scope.$on('$destroy', function() {
        $scope.discoveringModal.remove();
    });
})

.controller('DevicesController', function($scope, OICService) {
    $scope.devices = OICService.getDevices();
    $scope.$watch(function() { return OICService.getDevices(); },
        function(newValue) {
            $scope.devices = newValue;
        });
})

.controller('ResourcesController', function($scope, OICService) {
    $scope.resources = OICService.getResources();
    $scope.$watch(function() { return OICService.getResources(); },
        function(newValue) {
            $scope.resources = newValue;
        });
})

.controller('ResourceController', function(
    $ionicModal, $scope, OICService, resource)
{
    $scope.resource = resource;
    $scope.saving = false;

    $ionicModal.fromTemplateUrl('templates/modals/editResourcePropertyModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.editResourcePropertyModal = modal;
    });

    // Scope functions
    $scope.editResourceProperty = function(key) {
        $scope.resourcePropertyBeingEdited = key;
        $scope.editResourcePropertyModal.show();
    };

    $scope.save = function() {
        $scope.saving = true;

        function done() {
            $scope.editResourcePropertyModal.hide();
            $scope.saving = false;
        }

        OICService.updateResource($scope.resource).then(
            function success() { done(); },
            function error(reason) { done(); alert(reason); }
        );
    };

    // Clean up
    $scope.$on('$destroy', function() {
        $scope.editResourcePropertyModal.remove();
    });
})

.controller('SettingsController', function($scope, SettingsService) {
    $scope.settingsService = SettingsService;
});
