module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');

    // load build config
    var options = require('./build.config');
    // initialize loaded configs
    grunt.initConfig(options);

    grunt.config.merge({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                src: '<%= config.src %>',
                dest: '<%= config.dest %>'
            }
        },

        karma: {
            test: {
                options: {
                    files: [
                        '<%= config.bower_components %>',
                        '<%= config.dest %>',
                        'src/**/*.spec.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: true,
                background: false,
                browsers: ['PhantomJS'],
                frameworks: ['jasmine'],
                reporters: ['progress'],
                plugins: [
                    'karma-jasmine',
                    'karma-phantomjs-launcher'
                ],
                logLevel: 'ERROR'
            },
            watch: {
                options: {
                    files: [
                        '<%= config.bower_components %>',
                        'src/**/*.js'
                    ]
                },
                runnerPort: 8001,
                singleRun: false,
                background: false,
                autoWatch: true,
                browsers: ['Chrome'],
                frameworks: ['jasmine'],
                reporters: ['progress'],
                plugins: [
                    'karma-jasmine',
                    'karma-chrome-launcher'
                ],
                logLevel: 'ERROR'
            }
        }
    });

    grunt.registerTask('default', ['test']);

    grunt.registerTask('test', 'Run karma unit tests', [
        'concat:dist', 'karma:test'
    ]);

    grunt.registerTask('run', 'Run service', [
        'karma:watch'
    ]);

};