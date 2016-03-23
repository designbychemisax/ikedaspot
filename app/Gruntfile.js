module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    "../www/js/app.js": ["main.js"]
                }
            }
        },
        uglify: {
            js : {
                src : ["../www/js/app.js"],
                dest : "../www/js/app.js"
            }
        },
        watch: {
            scripts: {
                files: [
                    "./**/*.js",
                    "./**/*.jsx",
                    "./*.jsx",
                    "./*.js"
                ],
                tasks: ["compile-dev"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("compile-dev", ["browserify"]);
    grunt.registerTask("minify", ["uglify"]);
    grunt.registerTask("compile-dist", ["browserify", "minify"]);
};