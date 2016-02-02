'use strict';

angular.module('oic_demo.services', [])

.factory('OICService', function($ionicPlatform, $rootScope, SettingsService) {
    var _plugin = null,
        _data = {
            resources: []
        };

    function _onresourcefound(event) {
        $rootScope.$apply(function() {
            _data.resources.push(event.resource);
        });
    }

    function _setBackend(backend) {
        return _plugin.setBackend(backend);
    }

    function _findResources(options) {
        _data.resources = [];
        return _plugin.findResources(options);
    }

    function _getResources() {
        return _data.resources;
    }

    function _getResource(index) {
        if (index < 0 || index > _data.resources.length) {
            return null;
        }

        return _data.resources[index];
    }

    // Init
    $ionicPlatform.ready(function() {
        if (window.cordova !== undefined) {
            _plugin = window.cordova.require('cordova/plugin/oic');
            _plugin.onresourcefound = _onresourcefound;
            _setBackend('iotivity').then(function() {
                _findResources(SettingsService.settings.resourceDiscovery);
            });
        }
    });

    return {
        // Data
        data: _data,

        // Functions
        setBackend: _setBackend,
        findResources: _findResources,
        getResources: _getResources,
        getResource: _getResource
    };
})

.factory('SettingsService', function() {
    var _settings = {
        resourceDiscovery: {
            deviceId: '',
            resourcePath: '',
            resourceType: 'oic.r.light'
        }
    };

    return {
        settings: _settings
    };
});
