module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
          all: ['Gruntfile.js', 'assests/**/*.js'],
          options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            },
          }},
        uglify: {
          options: {
            banner: '/ <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: ['bower_components/jquery/dist/jquery.min.js','bower_components/angular/angular.min.js','node_modules/tiny-date-picker/dist/tiny-date-picker.min.js'],
            dest: 'assets/scripts/todo.min.js'
          },

        },
        connect: {
          server: {
              options: {
                  keepalive: true
              }
          }
      }
        
      });
    
      // Load the plugins.
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-connect');
      // Default task(s).
      grunt.registerTask('default', ['uglify', 'jshint', 'connect']);
    
    };