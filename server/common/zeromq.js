const Logger = require('../log/logger');
const logger = new Logger('ZeroMq.js');

class ZeroMq {
    constructor(zeromq) {
        // initialize
        if (zeromq) {
            this.zmq = zeromq;
        } else {
            this.zmq = require('zeromq');
        }
    }

    connectNeoEva() {
        try {
            // // receive message similar broadcast
            // const zmqClient = this.zmq.socket('pull');
            // // client
            // zmqClient.connect(process.tcp);
            // zmqClient.on('message', function(msg) {
            //     console.log('work: %s', msg.toString());
            // });
            const zmqClient = this.zmq.socket('sub');
            zmqClient.connect(process.tcp_client);
            zmqClient.subscribe( process.topic_name);
            zmqClient.subscribe( process.topic_alert);
            zmqClient.on('message', function(topic, message) {
              const json = JSON.parse(message);
              console.log('From: ', topic.toString(), json);
            });
        } catch (error) {
            logger.error(error);
        }
    }

    requestNeoEva() {
        // zmq server
        const zmqServer = this.zmq.socket('pub');
        zmqServer.bindSync(process.tcp_server);
        let json = "";
        setInterval(function() {
            json =  JSON.stringify({
                msg: "I'm " + process.topic_camera + " send time " + new Date(),
                time: new Date()
            });
            zmqServer.send([process.topic_camera, json
                ], null, err => {
                if (err) {
                console.log(err);
                }
            });
        }, 12000);
    }

    notifyAuth0AccessToken(access_token) {
        try {
            const zmqServer = this.zmq.socket('pub');
            // zmq server
            zmqServer.bindSync(process.auth0_tcp);
            zmqServer.send([process.auth0_topic_name, access_token], null, err => {
                if (err) {
                  console.log(err);
                }
              });
        } catch (error) {
            logger.error(error);
        }
    }
}
module.exports = ZeroMq;