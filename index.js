var ProblemRunner = require("./src/problem-console/problem-runner.js").ProblemRunner;

module.exports = {
    runSample(wd) {
        ProblemRunner.runSample(wd, {});
    },
    runInput(ioName, wd) {
        ProblemRunner.runInput(wd, ioName);
    },
};