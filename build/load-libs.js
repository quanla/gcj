const gulp = require("gulp");

let dir = "/Users/quanle/Documents/Workon/Groupmatics/code/Groupmatics.Api/react/src/gm-common/js/utils";

module.exports = () => {
    gulp.src(`${dir}/**/*.*`)
        .pipe(gulp.dest("./node_modules/common-utils"));
    gulp.src(`${__dirname}/package.json`)
        .pipe(gulp.dest("./node_modules/common-utils"));
};

