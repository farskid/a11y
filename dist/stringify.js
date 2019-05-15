"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringifyWithUndefined = function (obj, space) {
    return JSON.stringify(obj, function (_, v) { return (v === undefined ? "undefined" : v); }, space);
};
