"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var fs = require("fs");
var minimist_1 = require("minimist");
var loggers_1 = require("./loggers");
var axeCore_1 = require("./runners/axeCore");
var pa11y_1 = require("./runners/pa11y");
var colors_1 = require("./colors");
var ora_1 = require("ora");
var stringify_1 = require("./stringify");
var report_1 = require("./report");
var spinner = function (txt) { return ora_1.default(txt); };
var engines = ["axecore", "pa11y"];
function runA11y(url, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var out, progressSpinner, runners, reports, report_2, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    out = options.out;
                    progressSpinner = spinner("Gathering a11y insights for " + colors_1.highlightText(url));
                    loggers_1.logger("\n");
                    progressSpinner.start();
                    runners = Promise.all([axeCore_1.runWithAxeCore(url), pa11y_1.runWithPa11y(url)]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, runners];
                case 2:
                    reports = _a.sent();
                    report_2 = "\n      " + "Accessibility Results For:".toUpperCase() + "\n      -----------\n      " + reports[0].documentTitle + "\n      " + reports[0].pageUrl + "\n    ";
                    reports.forEach(function (rep, index) {
                        report_2 += "\n      " + report_1.printReport(rep, out, engines[index]) + "\n      ";
                        fs.writeFileSync(path.resolve(out, "a11y-report-" + engines[index] + ".json"), stringify_1.jsonStringifyWithUndefined(rep, 2));
                    });
                    loggers_1.logger(report_2);
                    process.exitCode = 0;
                    return [3, 5];
                case 3:
                    err_1 = _a.sent();
                    loggers_1.errorLogger(err_1);
                    process.exitCode = 1;
                    return [3, 5];
                case 4:
                    loggers_1.successLogger("Done!");
                    progressSpinner.stop();
                    return [7];
                case 5: return [2];
            }
        });
    });
}
function main() {
    var args = minimist_1.default(process.argv.slice(2));
    var url = args.url, options = tslib_1.__rest(args, ["url"]);
    if (typeof url !== "string" || url === "") {
        return loggers_1.errorLogger("a11y can't find a url");
    }
    var defaultOptions = {
        out: path.resolve(process.cwd())
    };
    runA11y(url, Object.assign({}, defaultOptions, options));
}
main();
