var ProblemConsole = require("./problem-console/problem-console.js").ProblemConsole;
var ContestLoader = require("./contest-loader.js").ContestLoader;

if (process.argv.length === 3) {
    let url = process.argv[2];

    ContestLoader.loadContest(url, process.cwd());
} else {
    ProblemConsole.launchProblemConsole(process.cwd());
}

