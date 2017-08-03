const fs = require("fs");
const {StringUtil} = require("common-utils");

const IoReader = {
    readIn(path, perCaseFn, onDone) {
        fs.readFile(path, "utf8", (err, inputContent) => {
            let lines = inputContent.split(/\r?\n/g);

            let count = +lines[0];

            for (let i = 0; i < count; i++) {
                let line = lines[1 + i];
                if (perCaseFn(line, i)) {
                    break;
                }
            }

            onDone();
        });
    },
    readOut(path) {
        let content = fs.readFileSync(path, "utf8");
        let lines = content.split(/\r?\n/g);
        lines = lines.filter((line) => !StringUtil.isBlank(line));
        return lines.map((line) => line.replace(/^Case #\d+: /, ""));
    }
};

exports.IoReader = IoReader;