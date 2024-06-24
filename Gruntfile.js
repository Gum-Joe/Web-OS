// Prettified by js-prettify (https://www.npmjs.com/package/js-prettify)
const cli = require("cli-color");
const execute = require('child_process').exec;
const DEBUG_TARGETS = 'http,database,boot,kernal,starter,database:stdout,database:stderr,boot:recovery,server,socket.io,git';

module.exports = function(grunt) {

    // Add tasks.

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-js2coffee');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-html2jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        nodemon: {
            debug: {
                script: 'bin/jakhu',
                options: {
                    args: ['server'],
                    watch: ['app/boot', 'app/routes', 'libs', 'app.js', 'config', 'bin'],
                    ignore: ['node_modules/**', 'views/**'],
                    env: {
                        PORT: '8080',
                        JAKHU_RUN_TYPE: 'local',
                        DEBUG: DEBUG_TARGETS,
                        JAKHU_DOCKER_MACHINE: 'default'
                    },
                }
            },
            dev: {
                script: 'bin/jakhu',
                options: {
                    args: ['server'],
                    watch: ['app/boot', 'app/routes', 'libs', 'app.js', 'config'],
                    ignore: ['node_modules/**', 'views/**'],
                    ext: 'js,coffee,json',
                    env: {
                        PORT: '8080',
                        JAKHU_RUN_TYPE: 'local',
                        DEBUG: DEBUG_TARGETS
                    },
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'views/js/dashboard-react.js': 'views/__jsx/dashboard.js'
                },
                options: {
                    transform: ['babelify']
                }
            }
        },
        clean: {
            all: ['tmp', 'views/jade', 'views/css/sass'],
            cleanup: ['tmp', 'testing']
        },
        html2jade: {
            most: {
                options: {},
                files: {
                    //src: 'views/index.ejs',
                    'views/jade/index.jade': ['views/index.ejs'],
                    'views/jade/boot.jade': ['views/boot.ejs'],
                    'views/jade/booting.jade': ['views/booting.ejs'],
                    'views/jade/recovery.jade': ['views/recovery.ejs'],
                    'views/jade/setup.jade': ['views/setup.ejs'],
                    'views/jade/signin.jade': ['views/signin.ejs'],
                    'views/jade/signup.jade': ['views/signup.ejs']
                }
            }
        },
        coveralls: {
            options: {
                // LCOV coverage file relevant to every target
                src: 'misc/coverage/lcov.info',

                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },
            report: {
                // Target-specific LCOV coverage file
                src: 'misc/coverage/locv2.info'
            },
        },
        // Configure a mochaTest task
        // Configure Watching

        mochaTest: {
            server: {
                options: {
                    reporter: 'spec',
                    require: 'should',
                    captureFile: 'misc/coverage/cover.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'node_modules/',
                src: '**/*',
                dest: 'tmp/node_modules',
                expand: true,
            },
        },
        js2coffee: {
            options: {
                // Task-level options go here
                ignore: "node_modules"
            },
            // Compile all
            // individual CofeeScript files, retaining the same directory structure
            // in the destination folder
            root: {
                options: {},
                files: [{
                    cwd: './',
                    src: ['**/*.js'],
                    dest: './source/',
                    ext: '.coffee'
                }]
            },
            bin: {
                options: {},
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['**/*.js'],
                    dest: './source/',
                    ext: '.coffee'
                }]
            }
        },
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'views/css/dashboard.css': 'views/src/dashboard.scss', // 'destination': 'source'
                    'views/css/theme.css': 'views/src/theme.scss', // 'destination': 'source'
                    'views/css/boot.theme.css': 'views/src/boot.theme.scss', // 'destination': 'source'
                    'views/css/var.css': 'views/src/var.scss', // 'destination': 'source'
                    'views/css/oobe.css': 'views/src/oobe.scss', // 'destination': 'source'
                    'views/css/float.css': 'views/src/float.scss',
                    'views/css/dashboard-main.css': 'views/src/dashboard-main.scss',
                    'views/css/login.css': 'views/src/login.scss',
                    'views/css/error.css': 'views/src/error.scss',
                    'views/css/app-status-ejs-template.css': 'views/src/ejs-templates/app-status.scss',
                    'views/css/app-status-ejs-template-mobile.css': 'views/src/ejs-templates/app-status-mobile.scss',
                    'views/css/default-sheet.css': 'views/src/resources/default.scss',
                    'views/css/new-web-app.css': 'views/src/new-web-app.scss',
                    'views/css/new-web-app-build.css': 'views/src/new-web-app-build.scss',
                }
            },
        },
        exec: {
            bundle: 'bundle install',
            install: 'npm install',
            dev: 'npm install --dev',
            test: 'npm test',
            logs: 'mkdir logs && touch logs/wos.log',
            testtmp: 'mkdir testing && echo testing > misc/testing/test.txt',
            createtmp: 'mkdir tmp',
            testt: 'cd tmp && mkdir test',
            start: 'echo Y && node bin/start'
        },
        watch: {
            sass: {
                files: ['views/src/*.scss', 'views/src/**/*.scss', 'Gruntfile.js'],
                tasks: ['compile:sass'],
                options: {
                    interrupt: true,
                },
            },
            react: {
                files: ['views/__jsx/*.js', 'Gruntfile.js'],
                tasks: ['compile:react'],
                options: {
                    interrupt: true,
                },
            },
            start: {
                files: ['Gruntfile.js'],
                tasks: ['exec:start'],
                options: {
                    interrupt: true,
                },
            },
            test: {
                files: ['test/**/*.js', 'Gruntfile.js'],
                tasks: ['test'],
                options: {
                    interrupt: true,
                }
            },
            main: {
                files: ['views/**/*.scss', '*.js', 'libs/**/*.js', 'app/boot/**/*.js'],
                tasks: ['compile', 'test'],
                options: {
                    interrupt: true,
                }
            }
        }
    });
    grunt.registerTask('default', ['test', 'clean', 'compile']);
    grunt.registerTask('main', ['watch:main']);
    grunt.registerTask('ci', ['compile', 'clean']);
    grunt.registerTask('ciapp', ['compile', 'clean', 'exec:testtmp', 'mochaTest']);

    grunt.registerTask('test', ['exec:testtmp', 'mochaTest', 'clean:cleanup']);
    grunt.registerTask('test:server', 'mochaTest:server');

    grunt.registerTask('compile:sass:scss', 'sass:dist');
    grunt.registerTask('compile:sass', ['sass:dist']);
    grunt.registerTask('compile:watch', 'watch:scripts');
    grunt.registerTask('compile:coffee', ['js2coffee:bin']);
    grunt.registerTask('compile:coffee:sub', 'js2coffee:bin');
    grunt.registerTask('compile:jade', 'html2jade:most');
    grunt.registerTask('compile:react', 'browserify');
    grunt.registerTask('compile', ['compile:sass']);

    grunt.registerTask('install:bundle', 'exec:bundle');
    grunt.registerTask('install:npm', 'exec:install');
    grunt.registerTask('install:dev', 'exec:dev');
    grunt.registerTask('install', ['exec:dev', 'exec:install', 'exec:bundle']);

    grunt.registerTask('create:logs', 'exec:logs');
    grunt.registerTask('start', 'watch:start');

    grunt.registerTask('server:debug', 'nodemon:debug')
    grunt.registerTask('server:dev', 'nodemon:dev')
    grunt.registerTask('debug', 'server:debug')
    grunt.registerTask('dev', 'server:dev')
};
