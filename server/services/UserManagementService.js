"use strict";

const path = require("path");
const fs = require("fs");
const utilities = require("../utility/Utilities");
const SqliteDb = require(path.join(__dirname, "../common/SqliteDb.js"));

const authorization = {
  error: true,
  code: 101,
  message: "認証に失敗した場合に返される。",
};

const E400 = 400;
const E400MSG = "Bad Request.";
const E401 = 401;
const E401MSG = "Unauthorized";
const E403 = 403;
const E403MSG = "Forbidden";
const E404 = 404;
const E404MSG = "Not Found";
const E500 = 500;
const E500MSG = "Internal Server Error";

module.exports = {
  //==============================================================
  //==============================================================
  //==============================================================
  AW001001(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log(req.body);
        // console.log(req.headers.authorization);
        if (!req.body) {
          authorization.message = "ユーザID必須入力";
          resolve(authorization);
        } else if (!req.body.userId || req.body.userId === "") {
          authorization.message = "ユーザID必須入力";
          resolve(authorization);
        } else if (!req.body.password || req.body.password === "") {
          authorization.message = "パスワード必須入力";
          resolve(authorization);
        } else if (!req.body.appVer || req.body.appVer === "") {
          authorization.message = "アプリバージョン必須入力";
          resolve(authorization);
        } else {
          if (req.body.userId == "00000000400") {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.body.userId == "00000000401") {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.body.userId == "00000000403") {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.body.userId == "00000000404") {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.body.userId == "00000000500") {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          if (
            req.body.userId === "01234567899" &&
            req.body.password === "12345"
          ) {
            const dataworker = path.join(
              __dirname,
              "../config/dataworker.json"
            );
            utilities.loadFileJson("" + dataworker + "").then((json) => {
              if (json) {
                return resolve(json.AW001001);
              } else {
                authorization.message =
                  "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。";
                authorization.code = 500;
                return resolve(authorization);
              }
            });
          } else if (
            req.body.userId === "99876543210" &&
            req.body.password === "12345"
          ) {
            const dataworker = path.join(
              __dirname,
              "../config/dataworker.json"
            );
            utilities.loadFileJson("" + dataworker + "").then((json) => {
              if (json) {
                return resolve(json.AW001001A);
              } else {
                authorization.message =
                  "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。";
                authorization.code = 500;
                return resolve(authorization);
              }
            });
          } else {
            authorization.message = "ID または パスワードが誤っています。";
            authorization.code = 1;
            return resolve(authorization);
          }
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },

  AW001002(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log(req.body);

        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else if (!req.body.appVer || req.body.appVer === "") {
          authorization.message = "アプリバージョン必須入力。";
          resolve(authorization);
        } else {
          if (req.body.appVer == E400) {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.body.appVer == E401) {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.body.appVer == E403) {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.body.appVer == E404) {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.body.appVer == E500) {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              json.AW001002.data.token = process.token_org;
              return resolve(json.AW001002);
            } else {
              return resolve(authorization);
            }
          });
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001003(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log(req.body);

        // console.log(req.headers.authorization);
        // if (req.headers.authorization !== process.token) {
        //     authorization.message = "認証に失敗した場合に返される。";
        //     authorization.code = 401;
        //     resolve(authorization);
        // } else if (!req.body.deviceOSType || req.body.deviceOSType === '') {
        //     authorization.message = "デバイスOS種別必須入力";
        //     resolve(authorization);
        // } else if (!req.body.deviceToken || req.body.deviceToken === '') {
        //     authorization.message = "デバイストークン必須入力";
        //     resolve(authorization);
        // } else {
        //     if (req.body.deviceOSType == E400) {
        //         authorization.code = E400
        //         authorization.message = E400MSG;
        //         return resolve(authorization);
        //     } else if (req.body.deviceOSType == E401) {
        //         authorization.code = E401
        //         authorization.message = E401MSG;
        //         return resolve(authorization);
        //     } else if (req.body.deviceOSType == E403) {
        //         authorization.code = E403
        //         authorization.message = E403MSG;
        //         return resolve(authorization);
        //     } else if (req.body.deviceOSType == E404) {
        //         authorization.code = E404
        //         authorization.message = E404MSG;
        //         return resolve(authorization);
        //     } else if (req.body.deviceOSType == E500) {
        //         authorization.code = E500
        //         authorization.message = E500MSG;
        //         return resolve(authorization);
        //     }
        //     const sqliteDb = new SqliteDb();
        //     sqliteDb.getDeviceToken(req.body.deviceToken).then(rs => {
        //         if (rs && rs.existed === 1) {
        //             console.log('existed data');
        //             sqliteDb.close();
        //         } else {
        //             sqliteDb.insertData(req.body.deviceOSType, req.body.deviceToken).then(rs => {
        //                 console.log(rs);
        //                 sqliteDb.close();
        //             });
        //         }
        //     });

        // }
        const dataworker = path.join(__dirname, "../config/dataworker.json");
        utilities.loadFileJson("" + dataworker + "").then((json) => {
          if (json) {
            return resolve(json.AW001003);
          } else {
            return resolve(authorization);
          }
        });
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001004(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          return resolve(authorization);
        } else {
          // if (req.body.deviceOSType == E400) {
          //     authorization.code = E400
          //     authorization.message = E400MSG;
          //     return resolve(authorization);
          // } else if (req.body.deviceOSType == E401) {
          //     authorization.code = E401
          //     authorization.message = E401MSG;
          //     return resolve(authorization);
          // } else if (req.body.deviceOSType == E403) {
          //     authorization.code = E403
          //     authorization.message = E403MSG;
          //     return resolve(authorization);
          // } else if (req.body.deviceOSType == E404) {
          //     authorization.code = E404
          //     authorization.message = E404MSG;
          //     return resolve(authorization);
          // } else if (req.body.deviceOSType == E500) {
          //     authorization.code = E500
          //     authorization.message = E500MSG;
          //     return resolve(authorization);
          // }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              json.AW001004.data.systemDate = utilities.convertTimestamps(
                0,
                "YYYY-MM-DD"
              );
              return resolve(json.AW001004);
            } else {
              return resolve(authorization);
            }
          });
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001005(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001005);
            } else {
              resolve(authorization);
            }
          });
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001006(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001006);
            } else {
              resolve(authorization);
            }
          });
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001007(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log("AW001007 ##################################");
        console.log(req.body);
        console.log("AW001007 ##################################");
        // console.log(req.headers.authorization);
        const dataworker = path.join(__dirname, "../config/dataworker.json");
        utilities.loadFileJson("" + dataworker + "").then((json) => {
          if (req.body.caseID === 100) {
            console.log("OK");
            return resolve(json.AW001007);
          } else {
            console.log("NO");
            authorization.code = 101;
            authorization.message = "huhu";
            return resolve(authorization);
            return resolve(json.AW001007E);
          }
        });

        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          return resolve(authorization);
        } else if (!req.body.caseID || req.body.caseID === "") {
          authorization.message = "案件ID必須入力";
          return resolve(authorization);
        }
        // else if (req.body.shifts && (!req.body.shifts.date || !req.body.shifts.workerShiftId)) {
        //     authorization.message = "日々のシフト情報必須入力";
        //     return resolve(authorization);
        // }
        else if (!req.body.workerMessage || req.body.workerMessage === "") {
          authorization.message = "連絡事項メッセージ必須入力";
          return resolve(authorization);
        } else {
          if (req.body.caseID == E400) {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.body.caseID == E401) {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.body.caseID == E403) {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.body.caseID == E404) {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.body.caseID == E500) {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              const shifts = req.body.shifts;
              if (shifts) {
                shifts.forEach(function (element) {
                  if (!element.date || element.date.length !== 10) {
                    return resolve(json.AW001007E);
                  } else if (!element.workerShiftId) {
                    return resolve(json.AW001007E);
                  }
                });
              }
              return resolve(json.AW001007);
            } else {
              return resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001008(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          //
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001008);
            } else {
              resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001009(req) {
    return new Promise((resolve, reject) => {
      try {
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else if (!req.query.date || req.body.date === "") {
          authorization.message = "対象日必須入力";
          resolve(authorization);
        } else if (!req.query.shiftChangeId || req.body.shiftChangeId === "") {
          authorization.message = "シフト変更ID必須入力";
          resolve(authorization);
        } else {
          if (req.query.shiftChangeId == E400) {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E401) {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E403) {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E404) {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E500) {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              if (req.query.date.length !== 10) {
                return resolve(json.AW001009E);
              } else {
                return resolve(json.AW001009);
              }
            } else {
              return resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001010(req) {
    return new Promise((resolve, reject) => {
      try {
        const dataworker = path.join(__dirname, "../config/dataworker.json");
        utilities.loadFileJson("" + dataworker + "").then((json) => {
          if (json) {
            return resolve(json.AW001010);
          } else {
            return resolve(authorization);
          }
        });
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001011(req) {
    console.log("AW001011");
    return new Promise((resolve, reject) => {
      try {
        console.log(req.query.date);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          return resolve(authorization);
        } else if (!req.query.date || req.body.date === "") {
          authorization.message = "対象日必須入力";
          return resolve(authorization);
        } else if (!req.query.shiftChangeId || req.body.shiftChangeId === "") {
          authorization.message = "シフト変更ID必須入力";
          return resolve(authorization);
        } else {
          if (req.query.shiftChangeId == E400) {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E401) {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E403) {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E404) {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.query.shiftChangeId == E500) {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              if (req.query.date.length !== 10) {
                return resolve(json.AW001011E);
              } else {
                return resolve(json.AW001011);
              }
            } else {
              return resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001012(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log("12312312321");

        req.st = 200;
        if (req.body.actionFlg === 1) {
          if (req.body.changeToShiftId === 2) {
            authorization.code = 101;
            authorization.message = "シフト変更申請のアクション必須入力";
            authorization.error = true;
            return resolve(authorization);
          } else if (req.body.changeToShiftId === 3) {
            authorization.code = 102;
            authorization.message = "対象日必須入力";
            authorization.error = true;
            return resolve(authorization);
          } else if (req.body.changeToShiftId === E400) {
            req.st = E400;
            return resolve(authorization);
          } else if (req.body.changeToShiftId === E500) {
            req.st = E500;
            return resolve(authorization);
          } else if (req.body.changeToShiftId === E401) {
            req.st = E401;
            return resolve(authorization);
          } else {
            authorization.code = 0;
            authorization.message = "";
            return resolve(authorization);
          }
        } else if (req.body.actionFlg === 2 || req.body.actionFlg === 3) {
          if (req.body.shiftChangeId === 2) {
            authorization.code = 101;
            authorization.message = "シフト変更申請のアクション必須入力";
            authorization.error = true;
            return resolve(authorization);
          } else if (req.body.shiftChangeId === 3) {
            authorization.code = 102;
            authorization.message = "対象日必須入力";
            authorization.error = true;
            return resolve(authorization);
          } else if (req.body.shiftChangeId === E400) {
            req.st = E400;
            return resolve(authorization);
          } else if (req.body.shiftChangeId === E500) {
            req.st = E500;
            return resolve(authorization);
          } else if ((req.body.shiftChangeId = E401)) {
            req.st = E401;
            return resolve(authorization);
          } else {
            authorization.code = 0;
            authorization.message = "";
            return resolve(authorization);
          }
        }

        // if (req.headers.authorization !== process.token) {
        //     authorization.message = "認証に失敗した場合に返される。";
        //     authorization.code = 401;
        //     return resolve(authorization);
        // } else if (!req.body.date || req.body.date === '') {
        //     authorization.message = '対象日必須入力';
        //     return resolve(authorization);
        // } else if (!req.body.actionFlg || req.body.actionFlg === '') {
        //     authorization.message = 'シフト変更申請のアクション必須入力';
        //     return resolve(authorization);
        // } else {
        //     if (req.body.actionFlg == E400) {
        //         authorization.code = E400
        //         authorization.message = E400MSG;
        //         return resolve(authorization);
        //     } else if (req.body.actionFlg == E401) {
        //         authorization.code = E401
        //         authorization.message = E401MSG;
        //         return resolve(authorization);
        //     } else if (req.body.actionFlg == E403) {
        //         authorization.code = E403
        //         authorization.message = E403MSG;
        //         return resolve(authorization);
        //     } else if (req.body.actionFlg == E404) {
        //         authorization.code = E404
        //         authorization.message = E404MSG;
        //         return resolve(authorization);
        //     } else if (req.body.actionFlg == E500) {
        //         authorization.code = E500
        //         authorization.message = E500MSG;
        //         return resolve(authorization);
        //     }

        //     //
        // }
        // if (req.body.changeReason) {
        //     const changeReason = req.body.changeReason;
        //     for (let i=0; i<changeReason.length; i++) {
        //         console.log("AW001012: " + Buffer.byteLength(changeReason.charAt(i)));
        //         if (Buffer.byteLength(changeReason.charAt(i)) < 2) {
        //             authorization.message = 'シフト変更申請のアクション必須入力';
        //             return resolve(authorization);
        //         }
        //     }
        // }
        //
        const dataworker = path.join(__dirname, "../config/dataworker.json");
        utilities.loadFileJson("" + dataworker + "").then((json) => {
          if (json) {
            return resolve(json.AW001012);
          } else {
            return resolve(authorization);
          }
        });
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001013(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          //
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001013);
            } else {
              resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001014(req) {
    return new Promise((resolve, reject) => {
      try {
        // console.log(req.headers.authorization);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          //
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001014);
            } else {
              resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001015(req) {
    return new Promise((resolve, reject) => {
      try {
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          return resolve(authorization);
        } else if (!req.body.worksheetList.date || req.body.date === "") {
          authorization.message = "対象日必須入力";
          return resolve(authorization);
        } else if (
          !req.body.worksheetList.finishTime ||
          req.body.finishTime === ""
        ) {
          authorization.message = "終業時間必須入力";
          return resolve(authorization);
        } else if (!req.body.worksheetList.workInfoList) {
          authorization.message = "業務番号ID必須入力";
          return resolve(authorization);
        } else {
          const workInfoList = req.body.worksheetList.workInfoList;
          console.log(workInfoList.length);
          if (workInfoList.length === 0) {
            authorization.message = "業務番号ID必須入力";
            return resolve(authorization);
          } else {
            workInfoList.forEach(function (element) {
              if (!element.workNumberId || element.workNumberId === "") {
                authorization.message = "業務番号ID必須入力";
                return resolve(authorization);
              } else if (!element.startTime || element.startTime === "") {
                authorization.message = "業務開始時間";
                return resolve(authorization);
              }
              if (element.workNumberId == E400) {
                authorization.code = E400;
                authorization.message = E400MSG;
                return resolve(authorization);
              } else if (element.workNumberId == E401) {
                authorization.code = E401;
                authorization.message = E401MSG;
                return resolve(authorization);
              } else if (element.workNumberId == E403) {
                authorization.code = E403;
                authorization.message = E403MSG;
                return resolve(authorization);
              } else if (element.workNumberId == E404) {
                authorization.code = E404;
                authorization.message = E404MSG;
                return resolve(authorization);
              } else if (element.workNumberId == E500) {
                authorization.code = E500;
                authorization.message = E500MSG;
                return resolve(authorization);
              }
            });
          }
          //
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              if (req.body.worksheetList.date.length !== 10) {
                return resolve(json.AW001015E);
              } else {
                return resolve(json.AW001015);
              }
            } else {
              return resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  AW001016(req) {
    return new Promise((resolve, reject) => {
      try {
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          resolve(authorization);
        } else {
          //
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              resolve(json.AW001016);
            } else {
              resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      reject("サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。");
    });
  },
  AW001017(req) {
    return new Promise((resolve, reject) => {
      try {
        console.log(req.query.noticeId);
        if (req.headers.authorization !== process.token) {
          authorization.message = "認証に失敗した場合に返される。";
          authorization.code = 401;
          return resolve(authorization);
        } else if (!req.query.noticeId || req.query.noticeId === "") {
          authorization.message = "連絡ID必須入力";
          return resolve(authorization);
        } else {
          if (req.query.noticeId == E400) {
            authorization.code = E400;
            authorization.message = E400MSG;
            return resolve(authorization);
          } else if (req.query.noticeId == E401) {
            authorization.code = E401;
            authorization.message = E401MSG;
            return resolve(authorization);
          } else if (req.query.noticeId == E403) {
            authorization.code = E403;
            authorization.message = E403MSG;
            return resolve(authorization);
          } else if (req.query.noticeId == E404) {
            authorization.code = E404;
            authorization.message = E404MSG;
            return resolve(authorization);
          } else if (req.query.noticeId == E500) {
            authorization.code = E500;
            authorization.message = E500MSG;
            return resolve(authorization);
          }
          const dataworker = path.join(__dirname, "../config/dataworker.json");
          utilities.loadFileJson("" + dataworker + "").then((json) => {
            if (json) {
              if (req.query.noticeId === "E") {
                return resolve(json.AW001017E);
              } else {
                return resolve(json.AW001017);
              }
            } else {
              return resolve(authorization);
            }
          });
          //
        }
      } catch (error) {
        return reject(
          "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
        );
      }
    }).catch((err) => {
      return reject(
        "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。"
      );
    });
  },
  //==============================================================
  //==============================================================
  //==============================================================
};
