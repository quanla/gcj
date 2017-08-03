const ArgvReader = {
    createArgvReader(argv) {

        let clone = argv.slice(2);

        let keys = {};

        for (let i = clone.length - 2; i > -1; i--) {
            const a = clone[i];
            if (a[0] == "-") {
                keys[a.substring(1)] = clone[i + 1];
                clone.splice(i, 2);
            }
        }

        let sequence = clone;

        return {
            sequence,
            param(key) {
                return keys[key];
            }
        };
    }
};

exports.ArgvReader = ArgvReader;