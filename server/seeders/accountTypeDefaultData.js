const accounttypeService = require('../services').accounttypeService;

module.exports = {

  /**
   * get all role from T_ACCOUNT_TYPE table
   * @param {*} req 
   * @param {*} res 
   */
  createAccounttype(req, res) {
    // get all role from T_ACCOUNT_TYPE table
    return accounttypeService.createAccounttype()
      .then(rs => {res.status(200).send(rs);})
      .catch(error => res.status(400).send(error));
  },
};