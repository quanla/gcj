const fs = require("fs");
const chokidar = require("chokidar");
const readline = require('readline');
var ObjectUtil = require("common-utils/object-util.js").ObjectUtil;
var ProblemRunner = require("./problem-runner.js").ProblemRunner;

const ProblemConsole = {
    launchProblemConsole(wd) {
        let options = {
            fastFail: true,
        };

        const rerun = function() {
            try {
                ProblemRunner.runSample(wd, options);
            } catch (e) {
                console.error(e);
            }
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
                rerun();
            })
        ;

        rerun();

        readStdIn({
            "": () => {
                rerun();
            },
            "ff": () => {
                options.fastFail = !options.fastFail;
                rerun();
            },
        });
    }
};

function readStdIn(cmds) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`Type any command in: ${ObjectUtil.keys(cmds).map((cmd) => cmd=="" ? "<Enter>" : cmd).join(", ")}`);

    function serve() {
        setTimeout(() => {

            rl.question('', (answer) => {

                let cmd = cmds[answer];
                if (cmd) {
                    cmd();
                }

                serve();
            });
        }, 100);
    }

    serve();
}

exports.ProblemConsole = ProblemConsole;