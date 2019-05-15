"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pa11y_1 = require("pa11y");
exports.runWithPa11y = function (url) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var pa11yOptions, results, report;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pa11yOptions = {
                    rootElement: "#__next",
                    standard: "WCAG2A",
                    includeNotices: true,
                    includeWarnings: true
                };
                return [4, pa11y_1.default(url, pa11yOptions)];
            case 1:
                results = _a.sent();
                report = {
                    documentTitle: results.documentTitle,
                    pageUrl: results.pageUrl,
                    errors: results.issues.filter(function (r) { return r.type === "error"; }),
                    warnings: results.issues.filter(function (r) { return r.type === "warning"; }),
                    notices: results.issues.filter(function (r) { return r.type === "notice"; })
                };
                return [2, report];
        }
    });
}); };
