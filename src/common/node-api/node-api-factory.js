const request = require("request");
const fs = require("fs");

const NodeApiFactory = {
    createApi({urlModifier, headers}) {

        function getHeaders(init) {
            let ret = init == null ? {} : Object.assign({}, init);
            for (var key in headers) {
                let valueF = headers[key];
                let value = valueF();
                if (value ) {
                    ret[key] = value;
                }
            }
            return ret;
        }

        function ajax(method) {
            return (url, json) => {
                // console.log(urlModifier(url));
                return new Promise((resolve, reject) => {
                    request({
                        url: urlModifier(url),
                        method,
                        headers: getHeaders({
                            'Content-Type': 'application/json',
                        }),
                        json
                    }, (err, res) => {
                        try {
                            resolve(JSON.parse(res.body));
                        } catch (e) {
                            console.log(res.body);
                            console.error(e);
                        }

                    });
                });
            }
        }

        return {
            get: ajax("GET"),
            post: ajax("POST"),
            put: ajax("PUT"),
            postMultipart(url, imagePath) {
                return new Promise((resolve, reject) => {

                    var req = request({
                        url: urlModifier(url),
                        method: "POST",
                        headers: getHeaders({
                            'Content-Type': 'multipart/form-data',
                        }),
                    }, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            try {
                                resolve(JSON.parse(body));
                            } catch (e) {
                                console.log(body);
                                console.error(e);
                            }
                        }
                    });
                    var form = req.form();
                    form.append('file', fs.createReadStream(imagePath));
                });
            }
        };
    }
};

exports.NodeApiFactory = NodeApiFactory;
            