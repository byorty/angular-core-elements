'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        ngtemplates: {
            sale: {
                options: {
                    prefix: '/'
                },
                cwd: 'www/',
                src: 'static/tpls/**/*.html',
                dest: 'www/static/dist/template.js'
            }
        },
        concat: {
            libs: {
                src: [
                    'www/static/js/libs/FileAPI.min.js',
                    'www/static/js/libs/angular-file-upload-shim.js',
                    'www/static/js/libs/angular-file-upload-html5-shim.js',
                    'www/static/js/libs/ZeroClipboard.js',
                    'www/static/js/libs/angular.js',
                    'www/static/js/libs/angular-sanitize.js',
                    'www/static/js/libs/angular-resource.js',
                    'www/static/js/libs/angular-route.js',
                    'www/static/js/libs/angular-loading-bar.js',
                    'www/static/js/libs/angular-clip.js',
                    'www/static/js/libs/angular-animate.js',
                    'www/static/js/libs/angular-file-upload.js',
                ],
                dest: 'www/static/dist/libs.js'
            },
            app: {
                src: [
                    'www/static/js/libs/angular-detector.js',
                    'www/static/js/libs/angular-mask.js',
                    'www/static/js/libs/angular-scroll.js',
                    'www/static/js/libs/angular-strap.js',
                    'www/static/js/libs/angular-strap.tpl.js',
                    'www/static/js/libs/hamster.js',
                    'www/static/js/*.js',
                    'www/static/js/user/*.js',
                    'www/static/dist/template.js'
                ],
                dest: 'www/static/dist/app.js'
            },
            admin: {
                src: [
                    'www/static/js/libs/angular-locale_ru-ru.js',
                    'www/static/js/*.js',
                    'www/static/js/admin/*.js',
                ],
                dest: 'www/static/dist/admin.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: {
                    sequences     : true,  // join consecutive statemets with the “comma operator”
                    properties    : true,  // optimize property access: a["foo"] → a.foo
                    dead_code     : true,  // discard unreachable code
                    drop_debugger : true,  // discard “debugger” statements
                    unsafe        : false, // some unsafe optimizations (see below)
                    conditionals  : true,  // optimize if-s and conditional expressions
                    comparisons   : true,  // optimize comparisons
                    evaluate      : true,  // evaluate constant expressions
                    booleans      : true,  // optimize boolean expressions
                    loops         : true,  // optimize loops
                    unused        : true,  // drop unused variables/functions
                    hoist_funs    : true,  // hoist function declarations
                    hoist_vars    : false, // hoist variable declarations
                    if_return     : true,  // optimize if-s followed by return/continue
                    join_vars     : true,  // join var declarations
                    cascade       : true,  // try to cascade `right` into `left` in sequences
                    side_effects  : true,  // drop side-effect-free statements
                    warnings      : true   // warn about potentially dangerous optimizations/code
                }
            },
            dist: {
                files: [{
                    expand: true,
                    src: 'www/static/dist/**/*.js'
                }]
            }
        },
        less: {
            dist: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: {
                    'www/static/dist/main.css': 'www/static/css/main.less',
                    'www/static/dist/mobile.css': 'www/static/css/mobile.less',
                    'www/static/dist/admin.css': 'www/static/css/admin.less',
                    'www/static/dist/home.css': 'www/static/css/home.less',
                    'www/static/dist/mobile-home.css': 'www/static/css/mobile-home.less',
                    'www/static/dist/bonus.css': 'www/static/css/bonus.less',
                    'www/static/dist/mobile-bonus.css': 'www/static/css/mobile-bonus.less'
                }
            }
        },
        copy: {
            dist: {
                src: [
                    'www/static/js/libs/ZeroClipboard.swf',
                    'www/static/js/libs/FileAPI.flash.swf'
                ],
                dest: 'www/static/dist/',
                expand: true,
                flatten: true
            }
        },
        clean: {
            dist: {
                src: [
                    'www/static/dist/template.js',
                ]
            }
        },
        md2html: {
            api: {
                options: {
                    layout: 'misc/md/base.html'
                },
                files: [{
                    src: ['misc/md/api.md'],
                    dest: 'www/api.html'
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-md2html');

    // Default task.
    grunt.registerTask(
        'default',
        [
            'ngtemplates',
            'concat',
            'uglify',
            'less',
            'copy',
            'clean',
            'md2html'
        ]
    );

};
