var ArgvReader = require("./common/argv-reader.js").ArgvReader;
var ProblemConsole = require("./problem-console/problem-console.js").ProblemConsole;
var ContestLoader = require("./contest-loader.js").ContestLoader;
const path = require("path");

let argvReader = ArgvReader.createArgvReader(process.argv);

let wd = process.cwd();

if (argvReader.param("d")) {
    wd = path.join(wd, argvReader.param("d"));
}

if (argvReader.sequence.length) {
    let url = argvReader.sequence[0];

    ContestLoader.loadContest(url, wd);
} else {
    ProblemConsole.launchProblemConsole(wd);
}

