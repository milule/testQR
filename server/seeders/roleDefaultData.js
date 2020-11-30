const roleService = require('../services').roleService;

module.exports = {

  /**
   * get all role from T_ROLE table
   * @param {*} req 
   * @param {*} res 
   */
  createRole(req, res) {
    // get all role from T_ROLE table
    return roleService.createRole()
      .then(rs => {res.status(200).send(rs);})
      .catch(error => res.status(400).send(error));
  },
};