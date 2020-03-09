module.exports = function (config) {
  config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
          'app/javascript/spec/*.js',
          'app/javascript/packs/game/*.js'
      ],
      preprocessors: {
          'app/javascript/packs/game/*.js': ['coverage']
      },
      plugins: [
          'karma-jasmine',
          'karma-phantomjs-launcher',
          'karma-coverage'
      ],
      reporters: ['progress', 'coverage'],
      port: 9878,
      colors: true,
      logLevel: config.LOG_DEBUG,
      autowatch: true,
      browsers: ['PhantomJS'],
      singleRun: false,
      concurrency: Infinity,
      coverageReporter: {
          includeAllSources: true,
          dir: 'coverage/',
          reporters: [
              { type: "html", subdir: "html" },
              { type: 'text-summary' }
          ]
      }
  });
};