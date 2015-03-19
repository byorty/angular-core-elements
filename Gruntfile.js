'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            dist: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    'dist/angular-core-elements.js': [
                        'src/module.coffee',
                        'src/button/button.coffee',
                        'src/datepicker/datepicker.coffee',
                        'src/dropdown/dropdown.coffee',
                        'src/form/form.coffee',
                        'src/modal/modal.coffee',
                        'src/panel/panel.coffee',
                        'src/table/table.coffee',
                        'src/autocomplete/autocomplete.coffee',
                    ]
                }
            }
        },
        ngtemplates: {
            ngCoreElements: {
                options: {
                    prefix: '/angular-core-elements'
                },
                src: 'src/**/*.html',
                dest: 'dist/angular-core-elements-tpls.js'
            }
        },
        concat: {
            dist: {
                src: [
                    'dist/angular-core-elements.js',
                    'dist/angular-core-elements-tpls.js',
                ],
                dest: 'dist/angular-core-elements.all.js'
            }
        },
        wrap: {
            dist: {
                src: ['dist/*.js'],
                dest: '.',
                options: {
                    wrapper: ['(function(angular) {', '})(window.angular);']
                }
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
                files: {
                    'dist/angular-core-elements.min.js': 'dist/angular-core-elements.js',
                    'dist/angular-core-elements-tpls.min.js': 'dist/angular-core-elements-tpls.js',
                    'dist/angular-core-elements.all.min.js': 'dist/angular-core-elements.all.js'
                }
            }
        },
        less: {
            dist: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: {
                    'dist/angular-core-elements.css': 'src/less/common.less'
                }
            }
        },
        clean: {
            dist: {
                src: [
                    'dist/angular-core-elements.src.coffee',
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask(
        'default',
        [
            'coffee',
            'ngtemplates',
            'concat',
            'wrap',
            'uglify',
            //'less',
            'clean',
        ]
    );

};
