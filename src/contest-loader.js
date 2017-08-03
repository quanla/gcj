var gcjApi = require("./api/gcj-api.js").gcjApi;
const fs = require("fs");
var ProblemReader = require("./problem-reader.js").ProblemReader;

function mkdir(dir) {
    try {
        fs.mkdirSync(dir);
    } catch (e) {
    }
}

const ContestLoader = {
    loadContest(url, toDir) {

        let match = new RegExp(`^https://code.google.com/codejam/contest/(\\d+)/.+`).exec(url);
        if (match) {
            // Contest url
            let contestId = match[1];

            console.log(`Loading contest id ${contestId}`);

            gcjApi.getContestInfo(contestId).then((contestInfo) => {
                for (let problemIndex = 0; problemIndex < contestInfo.problems.length; problemIndex++) {
                    let problem = contestInfo.problems[problemIndex];

                    mkdir(`${toDir}/p${problemIndex}`);
                    fs.writeFile(`${toDir}/p${problemIndex}/intro.html`, problem.body);
                    fs.writeFile(`${toDir}/p${problemIndex}/manifest.json`, JSON.stringify({
                        id: problem.id,
                        name: problem.name,
                        type: problem.type,
                        key: problem.key,
                        io: problem.io,
                    }));

                    mkdir(`${toDir}/p${problemIndex}/io`);

                    for (let ioIndex = 0; ioIndex < problem.io.length; ioIndex++) {
                        let io = problem.io[ioIndex];

                        gcjApi.downloadInput(contestId, problem.id, ioIndex, io.name).then((input) => {
                            // console.log(input);
                            fs.writeFile(`${toDir}/p${problemIndex}/io/${io.name}.in`, input);
                        });
                    }

                    let readProblem = ProblemReader.readProblem(problem);
                    if (readProblem.sample) {
                        fs.writeFile(`${toDir}/p${problemIndex}/io/sample.in`, readProblem.sample.in);
                        fs.writeFile(`${toDir}/p${problemIndex}/io/sample.out`, readProblem.sample.out);
                    }

                    if (!fs.existsSync(`${toDir}/p${problemIndex}/io-type.js`)) {
                        fs.writeFile(`${toDir}/p${problemIndex}/io-type.js`, `module.exports = {\n`
                            + `//    formatOutput: (output) => output == null ? "IMPOSSIBLE" : output,\n` +
                            `};`
                        );
                    }
                    if (!fs.existsSync(`${toDir}/p${problemIndex}/test.js`)) {
                        fs.writeFile(`${toDir}/p${problemIndex}/test.js`, `const gcj = require("gcj");\ngcj.runSample(__dirname);\n` +
                            problem.io.map((io) => `//gcj.runInput("${io.name}", __dirname);`).join("\n") + "\n"
                        );
                    }
                    if (!fs.existsSync(`${toDir}/p${problemIndex}/solve-per-case.js`)) {
                        fs.writeFile(`${toDir}/p${problemIndex}/solve-per-case.js`, `\nmodule.exports = (input) => {\n};`);
                    }

                }
            });
        }
    }
};

exports.ContestLoader = ContestLoader;