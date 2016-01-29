'use strict';

angular.module('oic_demo.services', [])

.factory('OICService', function($ionicPlatform, $rootScope, SettingsService) {
    var plugin = null,
       _data = {
            resources: []
        };

    function _onresourcefound(event) {
        $rootScope.$apply(function() {
            _data.resources.push(event.resource);
        });
    }

    function _setBackend(backend) {
        return plugin.setBackend(backend);
    }

    function _findResources(options) {
        _data.resources = [];
        return plugin.findResources(options);
    }

    // Init
    $ionicPlatform.ready(function() {
        if (window.cordova !== undefined) {
            plugin = window.cordova.require('cordova/plugin/oic');
            plugin.onresourcefound = _onresourcefound;
            _setBackend('mock').then(function() {
                _findResources(SettingsService.settings.resourceDiscovery);
            });
        }
    });

    return {
        // Data
        data: _data,

        // Functions
        setBackend: _setBackend,
        findResources: _findResources
    };
})

.factory('SettingsService', function() {
    var _settings = {
        resourceDiscovery: {
            deviceId: '127.0.0.1',
            resourcePath: '/',
            resourceType: 'light'
        }
    };

    return {
        settings: _settings
    };
});
