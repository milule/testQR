const path = require('path');
const admin = require("firebase-admin");
const SqliteDb = require(path.join(__dirname, 'SqliteDb.js'));

class FirebaseNotification {
    constructor() {
        this.count = 0;
    }
    
    sendNotification() {
        return new Promise((resolve, reject) => {
            this.count += 1;
            if (this.count > 4) {
                this.count = 1;
            }
            // Define a condition which will send to devices which are subscribed
            // to either the Google stock or the tech industry topics.
            var condition = "";

            // See documentation on defining a message payload.
            // var message = {
            //     notification: {
            //         title: "" + this.count,
            //         body: 'シフト登録@シフト確認@業務連絡@ワークシート登録'
            //     }
            // };

            const payload = {
                    "message": 'シフト登録@シフト確認@業務連絡@ワークシート登録',
                    "type": "" + this.count 
            };




            const sqliteDb = new SqliteDb();
            sqliteDb.getTokens().then(items => {
                if (items) {
                    items.map((item, i) => {
                        console.log(item.DeviceToken);
                        // Send a message to the device corresponding to the provided
                        // registration token.
                        // admin.messaging().sendToDevice(item.DeviceToken, payload).then(function(response) {
                        // admin.messaging().send(message).then((response) => {
                        //     // See the MessagingDevicesResponse reference documentation for
                        //     // the contents of response.
                        //     console.log('Successfully sent message:', response);
                        // }).catch(function(error) {
                        //     console.log('Error sending message:', error);
                        // });
                        var message = {
                            notification: {
                                title: "" + this.count,
                                body: 'シフト登録@シフト確認@業務連絡@ワークシート登録' //JSON.stringify(payload)
                            },
                            token: item.DeviceToken
                          };
                          
                          // Send a message to the device corresponding to the provided
                          // registration token.
                          admin.messaging().send(message).then((response) => {
                              // Response is a message ID string.
                              console.log('Successfully sent message:', response);
                            }).catch((error) => {
                              console.log('Error sending message:', error);
                            });
                    });
                }
            });
        });
    }
}
module.exports = FirebaseNotification;