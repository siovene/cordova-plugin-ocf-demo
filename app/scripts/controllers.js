'use strict'; 
angular.module('oic_demo.controllers', [])

.controller('AppController', function() {})

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

.controller('SettingsController', function($scope, DataService, SettingsService) {
    $scope.dataService = DataService;
    $scope.settingsService = SettingsService;
});
