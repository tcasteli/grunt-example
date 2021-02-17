module.exports = function (grunt) {

    grunt.initConfig({

        dir: {
            src: "webapp",
            dest: "dist"
        },

        clean: {
            dist: ['dist/**/*']
        },

        mkdir: {
            dist: {
                options: {
                    create: ['dist']
                }
            }
        },

        copy: {
            dev: { files: [{ expand: true, cwd: "<%= dir.src %>", src: ["**/*"], dest: "<%= dir.dest %>" }] }
        },

        obfuscator: {
            options: {
                // global options for the obfuscator
                banner: '// obfuscated for our convenience. Nothing to see here...\n'
            },
            prd: {
                options: {
                    // options for each sub task
                    debugProtection: true,
                    debugProtectionInterval: true
                },
                files: {
                    '': [
                        'dist/Component-preload.js'
                    ]
                }
            }
        },

        zip: {
            'dev': {
                cwd: 'dist/',
                src: ['dist/**/*'],
                dest: 'dist/DevAppBuild.zip'
            },
            'prd': {
                cwd: 'dist/',
                src: ['dist/**/*'],
                dest: 'dist/PrdAppBuild.zip'
            }
        },

        openui5_preload: {
            component: {
                options: {
                    resources: {
                        cwd: '<%= dir.src %>',
                        prefix: 'sap/ui/demo/todo',
                        src: [
                            "**/*.js",
                            "**/*.fragment.xml",
                            "**/*.view.xml",
                            "**/*.json"
                        ]
                    },
                    compatVersion: '1.71',
                    dest: '<%= dir.dest %>',
                    compress: true
                },
                components: true
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-openui5");
    grunt.loadNpmTasks("grunt-nwabap-ui5uploader");
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask("createDist", ["mkdir:dist"])
    grunt.registerTask("buildDev", ["mkdir:dist", "clean", "copy:dev", "zip:dev"])
    grunt.registerTask("buildPrd", ["mkdir:dist", "clean", "openui5_preload", "obfuscator:prd", "zip:prd"])

};
