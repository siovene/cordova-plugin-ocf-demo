angular.module('oic_demo.services', [])

.factory('OICService', function($ionicPlatform) {
    var _service = {
        plugin: null,
        resources: []
    };

    function _onresourcefound(event) {
        resource.push(event.resource);
    }

    function _findResources(options) {
        return _service.plugin.findResources(options);
    }

    // Init
    $ionicPlatform.ready(function() {
        _service.plugin = cordova.require('cordova/plugin/oic');
        _service.plugin.onresourcefound = _onresourcefound;
        _findResources();
    });

    return {
        // Data
        resources: _service.resourcess,

        // Functions
        findResources: _findResources
    };
});
