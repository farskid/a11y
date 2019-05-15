"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = tslib_1.__importStar(require("path"));
var fs_extra_1 = require("fs-extra");
var colors_1 = require("./colors");
var colors_2 = require("./colors");
var stringify_1 = require("./stringify");
function createReport(results, out, engine) {
    var ouputPath = path.resolve(out, "a11y-report-" + engine + ".json");
    return "\n    -----------\n    " + colors_1.errorText("A11y:: Errors found: " + results.errors.length) + "\n    " + colors_2.warningText("A11y:: Warnings Found: " + results.warnings.length) + "\n    " + colors_1.noticeText("A11y:: Notices Found: " + results.notices.length) + "\n    -----------\n    Reports saved in " + colors_1.highlightText("<" + ouputPath + ">") + "\n  ";
}
exports.createReport = createReport;
function storeReport(results, storePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fs_extra_1.ensureFile(storePath)];
                case 1:
                    _a.sent();
                    return [4, fs_extra_1.writeFile(path.resolve(storePath), stringify_1.jsonStringifyWithUndefined(results, 2))];
                case 2:
                    _a.sent();
                    return [2, true];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2];
            }
        });
    });
}
exports.storeReport = storeReport;
