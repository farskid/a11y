"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
exports.text = function (str) { return colors.white(str); };
exports.errorText = function (str) { return colors.bold(str).red; };
exports.warningText = function (str) { return colors.bold(str).yellow; };
exports.noticeText = function (str) { return colors.bold(str).cyan; };
exports.successText = function (str) { return colors.bold(str).green; };
exports.highlightText = function (str) { return colors.magenta(str); };
