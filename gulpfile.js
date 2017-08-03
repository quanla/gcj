const gulp = require("gulp");

gulp.task("build", () => {
    require("./build/load-libs")();
});