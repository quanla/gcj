var gcjApi = require("./api/gcj-api.js").gcjApi;
const {Cols} = require("common-utils");

if (process.argv.length === 3) {

    let url = process.argv[2];

    let match = new RegExp(`^https://code.google.com/codejam/contest/(\\d+)/.+`).exec(url);
    if (match) {
        // Contest url
        gcjApi.getContestInfo(match[1]).then((contestInfo) => {
            console.log(contestInfo.problems[0]);
            // console.log(contestInfo.problems[0].io);
        });

        console.log(match[1]);
    }
}

