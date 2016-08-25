'use strict'; 
angular.module('ocf_demo.controllers', [])

.controller('AppController', function() {})

.controller('DevicesController', function($scope, OCFService) {
    $scope.devices = OCFService.getDevices();
    $scope.$watch(function() { return OCFService.getDevices(); },
        function(newValue) {
            $scope.devices = newValue;
        });
})

.controller('ResourcesController', function($scope, OCFService) {
    $scope.resources = OCFService.getResources();
    $scope.$watch(function() { return OCFService.getResources(); },
        function(newValue) {
            $scope.resources = newValue;
        });
})

.controller('ResourceController', function(
    $ionicModal, $scope, OCFService, resource)
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

        OCFService.updateResource($scope.resource).then(
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
