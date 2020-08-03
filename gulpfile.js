'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    minifyCSS = require('gulp-clean-css');

//SCSS/CSS
var SCSS_SRC = path.resolve('src/assets/scss/default.scss'),
    SCSS_DEST = path.resolve('./src/assets/css');

function style() {
    return (
        gulp
            .src(SCSS_SRC)
 
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError) 
 
            // What is the destination for the compiled file?
            .pipe(gulp.dest(SCSS_DEST))
    );   
}

function watch(){
    style();
    //takes name of file to watch for changes, and function to run
    gulp.watch(SCSS_SRC, style)
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.watch = watch;