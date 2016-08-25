'use strict';

describe("OCFService", function() {
    var ocfService;

    beforeEach(module("ocf_demo"));

    beforeEach(inject(function(_OCFService_) {
        ocfService = _OCFService_;
    }));

    it("data and functions are defined and initialized", function() {
        expect(ocfService.data.resources).to.be.an('array').that.is.empty;
        expect(ocfService.setBackend).to.be.an('function');
        expect(ocfService.findResources).to.be.an('function');
    });
});
