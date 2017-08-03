const fs = require("fs");
const chokidar = require("chokidar");
const readline = require('readline');
var ProblemRunner = require("./problem-runner.js").ProblemRunner;

const ProblemConsole = {
    launchProblemConsole(wd) {
        let options = {
            fastFail: true,
        };

        const compile = function() {
            ProblemRunner.runSample(wd, options);
        };

        chokidar
            .watch(`${wd}/**`, {
                // ignored: /[\/\\]\./,
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                    pollInterval: 50
                }}
            )
            .on('all', (event, path) => {
                // console.log(event, path);
                compile();
            })
        ;

        compile();

        readStdIn({
            "ff": () => options.fastFail = !options.fastFail,
        });
    }
};

function readStdIn(cmds) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Command? (ff) ', (answer) => {

        let cmd = cmds[answer];
        if (cmd) {
            cmd();
            console.log("Ok");
        }

    });
    // rl.close();
}

exports.ProblemConsole = ProblemConsole;