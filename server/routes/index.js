// const Keys = require('../common/Keys');
// const multer  = require('multer');
// //
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     try {
//       cb(null, '/Users/imac-006/www/download_bus_arrival');
//     } catch (ex) {
//     }
//   },
//   filename: function (req, file, cb) {
//     try {
//       const key = new Keys().getUuid();
//       cb(null, file.fieldname + '-' + key);
//     } catch (ex) {
//     }
//   }
// });
// //
// const upload = multer({ storage: storage });
// const loginController = require('../controllers').loginController;
// const eventController = require('../controllers').eventController;
// const accountController = require('../controllers').accountController;
// // const rolesController = require('../controllers').rolesController;
// // const cameraController = require('../controllers').cameraController;
// //

// /**
//  *
//  */
// module.exports = app => {
//   app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     res.header(
//       'Access-Control-Allow-Methods',
//       'PUT, POST, GET, DELETE, OPTIONS'
//     );
//     next();
//   });

//   app.get('/api', (req, res) =>
//     res.status(200).send({
//       message: 'Welcome to the trole API!'
//     })
//   );

//   app.post('/api/uploadSingleFile', upload.single('image'), eventController.uploadSingleFile);
//   app.post('/api/uploadArrayFiles', upload.array('images', 2), loginController.verifyFileAccessToken, eventController.uploadArrayFiles);

//   app.post('/api/sendMail', loginController.verifyAccessToken, accountController.sendMail);
//   app.get('/api/getMailTemplate', loginController.verifyAccessToken, accountController.getMailTemplate);

    // //===============================================================================================
    // // app.post('/api/getUserAll', loginController.verifyAccessToken, accountController.getUserAll);
    // app.post('/api/getUserAll', accountController.getUserAll);
    // //  app.post('/api/getUserById', loginController.verifyAccessToken, accountController.getUserById);
    // app.post('/api/getUserById', accountController.getUserById);
    // // app.put('/api/createUser', loginController.verifyAccessToken, accountController.createUser);
    // app.put('/api/createUser', accountController.createUser);
    // // app.put('/api/setUserRemove', loginController.verifyAccessToken, accountController.setUserRemove);
    // app.delete('/api/deleteUser', accountController.deleteUser);
    // // new api
    // app.put('/api/updateUser', accountController.updateUser);
    // // new api
    // app.post('/api/getAuth0Token', accountController.getAuth0Token);
    // // new api
    // app.put('/api/activateUser', accountController.activateUser);
    // // new api
    // app.put('/api/deactivateUser', accountController.deactivateUser);

    // //ROLES
    // // new api
    // app.post('/api/getRoles', rolesController.getRoles);
    // // new api create a role
    // app.put('/api/createRole', rolesController.createRole);
    // // new api -> Assign users to a role
    // app.post('/api/assignUsersRole', rolesController.assignUsersRole);
    // // new api -> Get a role's users
    // // Lists the users that have been associated with a given role.
    // app.post('/api/getRoleOfUsers', rolesController.getRoleOfUsers);
    // // new api -> Updates a role with new values.
    // app.put('/api/updateRole', rolesController.updateRole);
    
   //===============================================================================================
// };