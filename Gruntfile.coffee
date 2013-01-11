module.exports = (grunt) ->
  grunt.initConfig
    pkg:
      grunt.file.readJSON 'package.json'
    
    coffee:
      compile:
        files:
          'lib/application.js': [
            'src/initial_data.coffee'
            'src/models/gist.coffee'
            'src/controllers/gists.coffee'
          ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default', ['coffee']
