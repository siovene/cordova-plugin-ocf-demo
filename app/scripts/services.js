'use strict';

angular.module('oic_demo.services', [])

.factory('OICService', function($ionicPlatform, $rootScope) {
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
        return plugin.findResources(options);
    }

    // Init
    $ionicPlatform.ready(function() {
        if (window.cordova !== undefined) {
            plugin = window.cordova.require('cordova/plugin/oic');
            plugin.onresourcefound = _onresourcefound;
            _setBackend('mock').then(function() {
                _findResources();
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
});
