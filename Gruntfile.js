module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            all: ['lib/*.js', 'examples/*.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('default', ['jshint', 'mochaTest']);
};
