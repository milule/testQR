const path = require('path');

class SqliteDb {
    constructor() {
        // initialize
        // const sqlite3 = require('sqlite3').verbose();
        // this.db = new sqlite3.Database('WorkerDb');

        const dbName = path.join(__dirname, 'WorkerDb.db');
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(dbName, (err) => {
            if (err) {
              console.error(err.message);
            }
        });
    }

    createTable() {
        try {
            const _this = this;
            
            this.db.serialize(function() {
                _this.db.run("CREATE TABLE IF NOT EXISTS T_FIREBASES (DeviceOSType TEXT, DeviceToken TEXT)");
                // const stmt = _this.db.prepare("INSERT INTO T_FIREBASES VALUES (?, ?)");
                // let query = '';
                // // for (let i = 0; i < 10; i++) {
                //     query = '';
                //     query += '1';
                //     query += ', DeviceToken@11111';
                //     stmt.run(query);
                // // }
                // stmt.finalize();
               
                // _this.db.each("SELECT rowid AS id, DeviceOSType, DeviceToken FROM T_FIREBASES", function(err, row) {
                //     console.log(row.id + ": " + row.DeviceToken);
                // });
              });
        } catch (ex) {
            console.log(ex);
        }
    }

    getDeviceToken(deviceToken) {
        return new Promise((resolve, reject) => {
            try {
                this.db.get("SELECT DeviceToken FROM T_FIREBASES WHERE DeviceToken = ?", [deviceToken], (err, rows) => {
                    if (err) {
                        resolve({
                            "existed" : 0
                        });
                    }
                    if (rows && rows.DeviceToken) {
                        resolve({
                            "existed" : 1
                        });
                    } else {
                        resolve({
                            "existed" : 0
                        });
                    }
                });
            } catch (error) {
                reject('error');
            }
        });
    }

    getTokens() {
        return new Promise((resolve, reject) => {
            try {
                this.db.all("SELECT DeviceToken FROM T_FIREBASES", [],  (err, rows) => {
                    resolve(rows);
                });
            } catch (error) {
                reject('error');
            }
        });
    }

    insertData(deviceOSType, deviceToken) {
        return new Promise((resolve, reject) => {
            try {
                const _this = this;
                const values = [deviceOSType, deviceToken]
                this.db.run("INSERT INTO T_FIREBASES(DeviceOSType, DeviceToken) VALUES (?, ?)", values, function(err) {
                    if (err) {
                        resolve({
                            "error" : 1
                        });
                    }
                    console.log(`Rows inserted ${this.changes}`);
                    resolve({
                        "error" : 0
                    });
                  });
            } catch (error) {
                console.log(error);
                resolve({
                    "error" : 1
                });
            }
        });
    }

    
    deleteData() {
        return new Promise((resolve, reject) => {
            try {
                this.db.run("DELETE FROM T_FIREBASES", function(err) {
                    if (err) {
                        resolve({
                            "error" : 1
                        });
                    }
                    resolve({
                        "error" : 0
                    });
                  });
            } catch (error) {
                resolve({
                    "error" : 2
                });
            }
        });
    }

    close() {
        try {
            if (this.db) {
                this.db.close();
            }
        } catch (ex) {

        }
    }
}
module.exports = SqliteDb;