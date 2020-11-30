class Logger {

    constructor(file) {
        try {
            const logconfig = require('./logconfig');
            this.logger = logconfig.log4js.getLogger('[File: ' + file + ']');
        } catch (ex) {

        }
    }

    debug(msg) {
        this.logger.debug(msg);
    }

    info(msg) {
        this.logger.info(msg);
    }

    warn(msg) {
        this.logger.warn(msg);
    }

    error(msg) {
        this.logger.error(msg);
    }

    fatal(msg) {
        this.logger.fatal(msg);
    }
    
}
module.exports = Logger;