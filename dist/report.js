"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var colors_1 = require("./colors");
var colors_2 = require("./colors");
function printReport(results, out, engine) {
    var ouputPath = path.resolve(out, "a11y-report-" + engine + ".json");
    return "\n    -----------\n    " + colors_1.errorText("A11y:: Errors found: " + results.errors.length) + "\n    " + colors_2.warningText("A11y:: Warnings Found: " + results.warnings.length) + "\n    " + colors_1.noticeText("A11y:: Notices Found: " + results.notices.length) + "\n    -----------\n    Reports saved in " + colors_1.highlightText("<" + ouputPath + ">") + "\n  ";
}
exports.printReport = printReport;
