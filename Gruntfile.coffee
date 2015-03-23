module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        coffee:
            coffee_to_js:
                options:
                    bare: true
                    sourceMap: true
                expand: true
                flatten: true
                src: ["src/*.coffee"]
                dest: 'js/'
                ext: ".js"

    grunt.loadNpmTasks 'grunt-contrib-coffee'

    grunt.registerTask 'default', ['coffee']