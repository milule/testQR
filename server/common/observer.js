const utility = require('../utility/Utilities');

const ObserverSingleton = (function () {

    let socketIO;

    function setSocketIO(_socketIO) {
        socketIO = _socketIO;
    }

    function observing(message) {
        if (socketIO && socketIO.nsp) {
            const msg = message;
            msg['Timestamp'] = utility.getCurrentDate();
            socketIO.nsp.emit('observer_brc_event', msg);
        }
    }

    function observingLocationTracking(mode, info) {
        if (socketIO && socketIO.nsp) {
            let _mes = {};
            _mes['Timestamp'] = utility.getCurrentDate();
            _mes['Mode'] = mode;
            _mes['Data'] = info;
            if (mode === 'START') {
                socketIO.nsp.emit('observer_brc_event', '########## START LOCATION TRACKING ##########');
            } 
            socketIO.nsp.emit('observer_brc_event', _mes);
            if (mode === 'END') {
                socketIO.nsp.emit('observer_brc_event', '########## END LOCATION TRACKING ##########');
            }
        }
    }

    return {
        setSocketIO,
        observing,
        observingLocationTracking
    }
})();

module.exports = ObserverSingleton;