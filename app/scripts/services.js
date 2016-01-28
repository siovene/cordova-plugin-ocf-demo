'use strict';

angular.module('oic_demo.services', [])

.factory('OICService', function($ionicPlatform) {
    var _service = {
        plugin: null,
        resources: []
    };

    function _onresourcefound(event) {
        _service.resources.push(event.resource);
    }

    function _setBackend(backend) {
        return _service.plugin._setBackend(backend);
    }

    function _findResources(options) {
        return _service.plugin.findResources(options);
    }

    // Init
    $ionicPlatform.ready(function() {
        if (window.cordova !== undefined) {
            _service.plugin = window.cordova.require('cordova/plugin/oic');
            _service.plugin.onresourcefound = _onresourcefound;
            _findResources();
        }
    });

    return {
        // Data
        resources: _service.resources,

        // Functions
        setBackend: _setBackend,
        findResources: _findResources
    };
});
