const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const CONFIG_PATH = path.join(__dirname, '../config/MqttConfig.json');
const locationSer = require('../services').locationService;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const fbaseService = require('../services/FirebaseService');
const FILE_NAME = 'MqttConnect.js';
const utility = require('../utility/Utilities');
const { STATUS_DEVICE_TRACKING, MQTT_TOPIC_LIST } = require('../utility/ConstsSystem');
// const SocketSingleton = require('../services/socketService');

class MQTTConnector {

    constructor() {
        // init topic names
        this.TOPIC_NAMES = [MQTT_TOPIC_LIST.TRACKING_USER, MQTT_TOPIC_LIST.LOCATION];
        this.checkMap = {};
    }

    /**
     * 
     * @param {*} topics 
     * @param {*} callback 
     * 
     */
    initConector() {
        const _this = this;
        this.loadConfig().then(conf => {
            const client  = mqtt.connect(conf.url);
            _this.onConnectTopics(client, conf);
            _this.onMessageTopics(client, conf);
        }).catch(err => {
            utility.rejectError(null , err, FILE_NAME);
        });
    }

    onConnectTopics(client, conf) {
        const _this = this;
        client.on('connect', _ => {
            // topic tracking_user
            if (_this.TOPIC_NAMES.includes(MQTT_TOPIC_LIST.TRACKING_USER)) {
                client.subscribe(conf.tpTrackingUser, err => {
                    if (err) {
                        utility.rejectError(null , new Error('connect to ' + MQTT_TOPIC_LIST.TRACKING_USER), FILE_NAME);
                    }
                    _this.checkMap[MQTT_TOPIC_LIST.TRACKING_USER] = !err;
                });
            }
            // topic topic_location
            if (_this.TOPIC_NAMES.includes(MQTT_TOPIC_LIST.LOCATION)) {
                client.subscribe(conf.topicName, err => {
                    if (err) {
                        utility.rejectError(null , new Error('connect to ' + MQTT_TOPIC_LIST.LOCATION), FILE_NAME);
                    }
                    _this.checkMap[MQTT_TOPIC_LIST.LOCATION] = !err;
                });
            }
        });
    }

    onMessageTopics(client, conf) {
        const _this = this;
        // message is Buffer
        client.on('message', function (topic, message) {
            if (topic === conf.tpTrackingUser && _this.checkMap[MQTT_TOPIC_LIST.TRACKING_USER]) {
                _this.initTrackingUser(message);
            }
            if (topic === conf.topicName && _this.checkMap[MQTT_TOPIC_LIST.LOCATION]) {
                _this.initTrackingLocation(message);
            }
            // client.end();
        });
    }

    initTrackingLocation(message) {
        if (message) {
            const json = JSON.parse(message.toString());
            const {
                AccountId, Accuracy, Timestamp, Latitude, Longitude, Altitude, 
                Bearing, Speed, BearingAccuracyDegrees, ElapsedRealtimeNanos,
                Extras, Provider, SpeedAccuracyMetersPerSecond, VerticalAccuracyMeters,
                DeviceId, Protocol, PriorityType, DetectedActivity, ActivityTransition, TransportMode
            } = json;

            // realtime location
            // SocketSingleton.updateDeviceTrackingData(json);

            locationSer.updateLocation(
                AccountId, Accuracy, Timestamp, Latitude, Longitude, Altitude, 
                Bearing, Speed, BearingAccuracyDegrees, ElapsedRealtimeNanos,
                Extras, Provider, SpeedAccuracyMetersPerSecond, VerticalAccuracyMeters,
                DeviceId, Protocol, PriorityType, DetectedActivity, ActivityTransition, TransportMode
            );
        }
    }

    initTrackingUser(message) {
        try {
            const json = JSON.parse(message.toString());
            if (json) {
                // send to firebase
                fbaseService.updateLastOnline({
                    AccountId: json.AccountId,
                    DeviceId: json.DeviceId,
                    Status: STATUS_DEVICE_TRACKING.ONLINE
                }).catch(err => {
                    utility.rejectError(null, err, FILE_NAME);
                });
                // update
                const key = json.AccountId + '_' + json.DeviceId;
                localStorage.setItem(key, STATUS_DEVICE_TRACKING.ONLINE);
            }
        } catch (err) {
            utility.rejectError(null, err, FILE_NAME);
        }
    }

    loadConfig() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(CONFIG_PATH, (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        const conf = JSON.parse(content).development;
                        resolve(conf);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new MQTTConnector();