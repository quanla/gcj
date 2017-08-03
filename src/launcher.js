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
            for (let i = 0; i < contestInfo.problems.length; i++) {
                let problem = contestInfo.problems[i];

                mkdir(`${process.cwd()}/p${i}`);
                fs.writeFile(`${process.cwd()}/p${i}/intro.html`, problem.body);
                fs.writeFile(`${process.cwd()}/p${i}/manifest.json`, JSON.stringify({
                    id: problem.id,
                    name: problem.name,
                    type: problem.type,
                    key: problem.key,
                    io: problem.io,
                }));

                let readProblem = ProblemReader.readProblem(problem);
                if (readProblem.sample) {
                    fs.writeFile(`${process.cwd()}/p${i}/sample.in`, readProblem.sample.in);
                    fs.writeFile(`${process.cwd()}/p${i}/sample.out`, readProblem.sample.out);
                }
            }
        });
    }
}

