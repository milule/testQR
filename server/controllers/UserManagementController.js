const accountService = require("../services").accountService;

module.exports = {
  AW001001(req, res) {
    console.log("resss", req);
    res.status.send({
      errorCode: "Request/ErrorDocomoBikeShareGetTerms",
    });
  },
  AW001002(req, res) {
    return accountService
      .AW001002(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001003(req, res) {
    return accountService
      .AW001003(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001004(req, res) {
    return accountService
      .AW001004(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001005(req, res) {
    return accountService
      .AW001005(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001006(req, res) {
    console.log("AW001006");
    return accountService
      .AW001006(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(401).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001007(req, res) {
    return accountService
      .AW001007(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(401).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001008(req, res) {
    console.log("AW001008");
    return accountService
      .AW001008(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001009(req, res) {
    console.log("AW001009");
    return accountService
      .AW001009(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001010(req, res) {
    console.log("AW001010");
    return accountService
      .AW001010(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001011(req, res) {
    return accountService
      .AW001011(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001012(req, res) {
    return accountService
      .AW001012(req)
      .then((rs) => res.status(req.st).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001013(req, res) {
    return accountService
      .AW001013(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001014(req, res) {
    return accountService
      .AW001014(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001015(req, res) {
    return accountService
      .AW001015(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001016(req, res) {
    return accountService
      .AW001016(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
  AW001017(req, res) {
    return accountService
      .AW001017(req)
      .then((rs) => res.status(200).send(rs || {}))
      .catch((error) =>
        res.status(200).send({
          error: true,
          code: 500,
          message:
            "サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。",
        })
      );
  },
};
