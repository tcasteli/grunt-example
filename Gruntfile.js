module.exports = function (grunt) {

    grunt.initConfig({

        dir: {
            src: "webapp",
            dest: "dist"
        },

        mkdir: {
            dist: {
                options: {
                    create: ['dist']
                }
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

    grunt.registerTask("buildDev", ["mkdir:dist"])
    grunt.registerTask("buildPrd", ["mkdir:dist"])

};
