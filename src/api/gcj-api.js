const {NodeApiFactory} = require("../common/node-api/node-api-factory.js");

let api = NodeApiFactory.createApi({
    urlModifier: (url) => `https://code.google.com/codejam/${url}`
});

const gcjApi = {
    getContestInfo(contestId) {
        return api.get(`contest/${contestId}/dashboard/ContestInfo`);
    },
    downloadInput(contestId, problemId, ioIndex, ioName) {
        // console.log(`https://code.google.com/codejam/contest/${contestId}/dashboard/do/A-${ioName}-practice.in?cmd=GetInputFile&problem=${problemId}&input_id=${ioIndex}&filename=A-${ioName}-practice.in&redownload_last=1&agent=website&csrfmiddlewaretoken=quanle`);
        let token = `ZmY2YzIzNjM4ZDI5YzgzOGUyZDkyNWMyZjYwZGE4MTR8fDE1MDE3Mzk4MDYwNjY4MzA%3D`;
        return api.get(
            `contest/${contestId}/dashboard/do/A-${ioName}-practice.in?cmd=GetInputFile&problem=${problemId}&input_id=${ioIndex}&filename=A-${ioName}-practice.in&redownload_last=1&agent=website&csrfmiddlewaretoken=${token}`,
            null,
            {contentType: "text/html"}
        );
    }
};

exports.gcjApi = gcjApi;