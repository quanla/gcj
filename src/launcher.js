var gcjApi = require("./api/gcj-api.js").gcjApi;
const {Cols} = require("common-utils");
const fs = require("fs");
var ProblemReader = require("./problem-reader.js").ProblemReader;

function mkdir(dir) {
    try {
        fs.mkdirSync(dir);
    } catch (e) {
    }
}
if (process.argv.length === 3) {

    let url = process.argv[2];

    let match = new RegExp(`^https://code.google.com/codejam/contest/(\\d+)/.+`).exec(url);
    if (match) {
        // Contest url
        let contestId = match[1];

        console.log(`Loading contest id ${contestId}`);

        gcjApi.getContestInfo(contestId).then((contestInfo) => {
            for (let problemIndex = 0; problemIndex < contestInfo.problems.length; problemIndex++) {
                let problem = contestInfo.problems[problemIndex];

                mkdir(`${process.cwd()}/p${problemIndex}`);
                fs.writeFile(`${process.cwd()}/p${problemIndex}/intro.html`, problem.body);
                fs.writeFile(`${process.cwd()}/p${problemIndex}/manifest.json`, JSON.stringify({
                    id: problem.id,
                    name: problem.name,
                    type: problem.type,
                    key: problem.key,
                    io: problem.io,
                }));

                mkdir(`${process.cwd()}/p${problemIndex}/io`);

                for (let ioIndex = 0; ioIndex < problem.io.length; ioIndex++) {
                    let io = problem.io[ioIndex];

                    gcjApi.downloadInput(contestId, problem.id, ioIndex, io.name).then((input) => {
                        // console.log(input);
                        fs.writeFile(`${process.cwd()}/p${problemIndex}/io/${io.name}.in`, input);
                    });
                }

                let readProblem = ProblemReader.readProblem(problem);
                if (readProblem.sample) {
                    fs.writeFile(`${process.cwd()}/p${problemIndex}/io/sample.in`, readProblem.sample.in);
                    fs.writeFile(`${process.cwd()}/p${problemIndex}/io/sample.out`, readProblem.sample.out);
                }
            }
        });
    }
}

