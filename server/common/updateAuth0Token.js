const schedule = require('node-schedule');
const Logger = require('../log/logger');
const logger = new Logger('UpdateAuth0Token.js');
const utilities = require('../utility/Utilities');

class UpdateAuth0Token {
    constructor() {
        // initialize
    }

    refreshAuth0AccessToken() {
        try {
            const rule = new schedule.RecurrenceRule();
            rule.minute = new schedule.Range(0, 59, 60);
            schedule.scheduleJob(rule, function() {
                try {
                    utilities.getAuth0Token().then(rs => {
                        if (rs) {
                            process.access_token_machine_old = process.access_token_machine;
                            process.access_token_machine = rs.access_token;
                            // zeroMq.notifyAuth0AccessToken(process.access_token_machine);
                        }
                    });
                } catch (ex) {
                    logger.error(ex);
                }
            });
        } catch (ex) {
            logger.error(ex);
        } finally {
            console.log('Init schedule refesh Auth0 token.');
        }
    }
}
module.exports = UpdateAuth0Token;