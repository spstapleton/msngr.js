if (typeof chai === "undefined" && typeof window === "undefined") {
  var chai = require("chai");
}

if (typeof expect === "undefined") {
  var expect = chai.expect;
}

if (typeof msngr === "undefined" && typeof window === "undefined") {
  var msngr = require("../../msngr");
}

describe("./stores/memory.js", function () {
    "use strict";

    beforeEach(function() {
        msngr.store.clear();
    });

    it("msngr.store.index(message) - indexes a message with only a topic", function () {
        var message = {
            topic: "TestTopic1"
        };

        expect(msngr.store.count()).to.equal(0);
        var id = msngr.store.index(message);
        expect(id).to.exist;
        expect(msngr.store.count()).to.equal(1);
    });

    it("msngr.store.index(message) - indexes a message with a topic and category", function () {
        var message = {
            topic: "TestTopic1",
            category: "TestCategory1"
        };

        expect(msngr.store.count()).to.equal(0);
        var id = msngr.store.index(message);
        expect(id).to.exist;
        expect(msngr.store.count()).to.equal(1);
    });

    it("msngr.store.index(message) - indexes a message with a topic and dataType", function () {
        var message = {
            topic: "TestTopic1",
            dataType: "TestDataType1"
        };

        expect(msngr.store.count()).to.equal(0);
        var id = msngr.store.index(message);
        expect(id).to.exist;
        expect(msngr.store.count()).to.equal(1);
    });

    it("msngr.store.index(message) - indexes a message with a topic, category and dataType", function () {
        var message = {
            topic: "TestTopic1",
            category: "TestCategory1",
            dataType: "TestDataType1"
        };

        expect(msngr.store.count()).to.equal(0);
        var id = msngr.store.index(message);
        expect(id).to.exist;
        expect(msngr.store.count()).to.equal(1);
    });

    it("msngr.store.index(message) - invalid message shouldn't index", function () {
        var message = {
            cookie: "monster"
        };

        expect(msngr.store.count()).to.equal(0);
        var id = msngr.store.index(message);
        expect(id).to.not.exist;
        expect(msngr.store.count()).to.equal(0);
    });

    it("msngr.store.delete(uuid) - deletes a valid uuid", function () {
        var message = {
            topic: "TestTopic1",
            category: "TestCategory1",
            dataType: "TestDataType1"
        };

        var id = msngr.store.index(message);
        expect(id).to.exist;

        var result = msngr.store.delete(id);
        expect(result).to.exist;
        expect(result).to.equal(true);
        expect(msngr.store.count()).to.equal(0);
    });

    it("msngr.store.delete(uuid) - doesn't delete an invalid uuid", function () {
        var result = msngr.store.delete("sldfjslkfjlwrjlskdfjs");
        expect(result).to.exist;
        expect(result).to.equal(false);
        expect(msngr.store.count()).to.equal(0);
    });

    it("msngr.store.query(message)", function () {
        var message = {
            topic: "TestTopic1",
            category: "TestCategory1",
            dataType: "TestDataType1"
        };

        var id = msngr.store.index(message);
        expect(id).to.exist;

        var result1 = msngr.store.query({ topic: "TestTopic1" });
        var result2 = msngr.store.query({ topic: "TestTopical" });
        var result3 = msngr.store.query({ topic: "TestTopic1", category: "TestCategory1" });
        var result4 = msngr.store.query({ topic: "TestTopic1", category: "TestCategoral" });
        var result5 = msngr.store.query({ topic: "TestTopic1", category: "TestCategory1", dataType: "TestDataType1" });
        var result6 = msngr.store.query({ topic: "TestTopic1", category: "TestCategory1", dataType: "TestDataTypal" });

        expect(result1).to.exist;
        expect(result2).to.exist;
        expect(result3).to.exist;
        expect(result4).to.exist;
        expect(result5).to.exist;
        expect(result6).to.exist;

        expect(result1.length).to.equal(1);
        expect(result2.length).to.equal(0);
        expect(result3.length).to.equal(1);
        expect(result4.length).to.equal(0);
        expect(result5.length).to.equal(1);
        expect(result6.length).to.equal(0);
    });
});
