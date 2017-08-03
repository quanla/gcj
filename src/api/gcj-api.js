const {NodeApiFactory} = require("../common/node-api/node-api-factory.js");

let api = NodeApiFactory.createApi({
    urlModifier: (url) => `https://code.google.com/codejam/${url}`
});

const gcjApi = {
    getContestInfo(contestId) {
        return api.get(`contest/${contestId}/dashboard/ContestInfo`);
    }
};

exports.gcjApi = gcjApi;