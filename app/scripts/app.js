'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ocf_demo' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ocf_demo.controllers' is found in controllers.js
angular.module('ocf_demo', ['ionic', 'ocf_demo.controllers', 'ocf_demo.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController'
    })
    .state('app.devices', {
        url: '/devices',
        views: {
            'menuContent': {
                templateUrl: 'templates/devices.html',
                controller: 'DevicesController',
            }
        }
    })
    .state('app.resources', {
        url: '/resources',
        views: {
            'menuContent': {
                templateUrl: 'templates/resources.html',
                controller: 'ResourcesController',
            }
        }
    })
    .state('app.resource', {
        url: '/resource/{resourceId}',
        views: {
            'menuContent': {
                templateUrl: 'templates/resource.html',
                controller: 'ResourceController',
                resolve: {
                    resource: function($stateParams, OCFService) {
                        return OCFService.getResource(parseInt($stateParams.resourceId));
                    }
                }
            }
        }
    })
    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/resources');
});
