"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = tslib_1.__importStar(require("path"));
var minimist_1 = tslib_1.__importDefault(require("minimist"));
var loggers_1 = require("./loggers");
var axeCore_1 = require("./runners/axeCore");
var pa11y_1 = require("./runners/pa11y");
var colors_1 = require("./colors");
var ora_1 = tslib_1.__importDefault(require("ora"));
var report_1 = require("./report");
var spinner = function (txt) { return ora_1.default(txt); };
var engines = ["axecore", "pa11y"];
function runA11y(url, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, out, progressSpinner, runners, reports, report, storeProcesses, err_1, err_2;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    out = options.out;
                    progressSpinner = spinner("Gathering a11y insights for " + colors_1.highlightText(url) + " \n\n");
                    progressSpinner.start();
                    runners = Promise.all([axeCore_1.runWithAxeCore(url), pa11y_1.runWithPa11y(url)]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 9]);
                    return [4, runners];
                case 2:
                    reports = _b.sent();
                    report = (_a = "\n    " + "Accessibility Results For:".toUpperCase() + "\n    -----------\n    " + reports[0].documentTitle + "\n    " + reports[0].pageUrl + "\n    ").concat.apply(_a, reports.map(function (rep, index) { return report_1.createReport(rep, out, engines[index]); })).concat("\n\n");
                    storeProcesses = Promise.all(reports.map(function (rep, index) {
                        return report_1.storeReport(rep, path.resolve(out, "a11y-report-" + engines[index] + ".json"));
                    }));
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4, storeProcesses];
                case 4:
                    _b.sent();
                    return [3, 6];
                case 5:
                    err_1 = _b.sent();
                    throw err_1;
                case 6:
                    loggers_1.logger(report);
                    process.exitCode = 0;
                    return [3, 9];
                case 7:
                    err_2 = _b.sent();
                    loggers_1.errorLogger(err_2);
                    process.exitCode = 1;
                    return [3, 9];
                case 8:
                    loggers_1.successLogger("Done!");
                    progressSpinner.stop();
                    return [7];
                case 9: return [2];
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
