'use strict';

describe("OICService", function() {
    var oicService;

    beforeEach(module("oic_demo"));

    beforeEach(inject(function(_OICService_) {
        oicService = _OICService_;
    }));

    it("data and functions are defined and initialized", function() {
        expect(oicService.data.resources).to.be.an('array').that.is.empty;
        expect(oicService.setBackend).to.be.an('function');
        expect(oicService.findResources).to.be.an('function');
    });
});
