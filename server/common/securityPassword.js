class SecurityPassword {

    constructor() {
        this.bcrypt = require('bcrypt');
        this.saltRounds = 10;
    }

    generatedPassword(textPass) {
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.bcrypt.genSalt(_this.saltRounds, function(err, salt) {
                if (err) {
                    resolve({
                        Error: "1",
                        Hash: ""
                    });
                } else {
                    _this.bcrypt.hash(textPass, salt, function(err, hash) {
                        if (err) {
                            resolve({
                                Error: "1",
                                Hash: ""
                            });
                        } else {
                            // Store hash in your password DB.
                            resolve({
                                Error: "0",
                                Hash: hash
                            });
                        }
                    });
                }
            });
        });
    }

    comparePassword(textPass, hashDb) {
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.bcrypt.compare(textPass, hashDb, function(err, res) {
                if (err) {
                    resolve({
                        Error: "1",
                        Result: false
                    });
                } else {

                }
                resolve({
                    Error: "0",
                    Result: res
                });
            });
        });
    }
}

module.exports = SecurityPassword;