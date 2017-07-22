"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Data = (function () {
    function Data() {
    }
    Data.prototype.getBuilds = function () {
        var promise = $.get("/api/build/all");
        return promise;
    };
    return Data;
}());
exports.Data = Data;
