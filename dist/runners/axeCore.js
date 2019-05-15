"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axe_puppeteer_1 = require("axe-puppeteer");
var puppeteer = require("puppeteer");
function runAxeCore(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var browser, page, results, title;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4, page.setBypassCSP(true)];
                case 3:
                    _a.sent();
                    return [4, page.goto(url)];
                case 4:
                    _a.sent();
                    return [4, new axe_puppeteer_1.AxePuppeteer(page).analyze()];
                case 5:
                    results = _a.sent();
                    return [4, page.title()];
                case 6:
                    title = _a.sent();
                    return [4, page.close()];
                case 7:
                    _a.sent();
                    return [4, browser.close()];
                case 8:
                    _a.sent();
                    return [2, { results: results, documentTitle: title }];
            }
        });
    });
}
exports.runAxeCore = runAxeCore;
function runWithAxeCore(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, results, documentTitle, report;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, runAxeCore(url)];
                case 1:
                    _a = _b.sent(), results = _a.results, documentTitle = _a.documentTitle;
                    report = {
                        documentTitle: documentTitle,
                        pageUrl: results.url,
                        errors: results.violations,
                        warnings: results.incomplete,
                        notices: results.inapplicable
                    };
                    return [2, report];
            }
        });
    });
}
exports.runWithAxeCore = runWithAxeCore;
