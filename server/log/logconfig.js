const log4js = require('log4js');
// const utilities = require('../utility').utilities;

log4js.configure({
  appenders: {
    // access: { type: 'dateFile', filename: utilities.getPathLogDebug() + '/wwwwweasytravel.log', pattern: '-yyyy-MM-dd' },
    // logFile: { type: 'file', filename: utilities.getPathLogDebug() + '/easytravel.log', pattern: '-yyyy-MM-dd',  "backups": 3  },
    logFile: { type: 'file', filename: process.log + '/easytravel.log', pattern: '-yyyy-MM-dd',  "backups": 3  },
    app: { type: 'logLevelFilter', level: 'debug', appender: 'logFile' }
  },
  categories: {
    default: { appenders: ['app'], level: 'debug' },
    http: { appenders: ['app'], level: 'debug' }
  }
});

module.exports = {
  log4js: log4js,
  isDebug: function(category) {
    return (log4js.levels.DEBUG.level >= category.level.level);
  }
};