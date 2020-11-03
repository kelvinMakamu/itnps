const router   = require("express").Router();
/********
 * 
 * CTRLS
 *
**********/
const authCtrl   = require('../controllers/auth.controller');
const userCtrl   = require('../controllers/user.controller');
const resCtrl    = require('../controllers/response.controller');
const authorized = [ authCtrl.loginRequired, authCtrl.isValidToken ];
/*****
 * 
 * AUTH
 *
********/
router.post("/auth/login", authCtrl.login);
router.post("/auth/register", authCtrl.registerUser);
router.post("/auth/reset", authCtrl.resetPassword);
router.post("/auth/logout", authCtrl.logoutUser);
/******
 * 
 * USERS
 *
********/
router.get("/users", userCtrl.findUsers);
router.get("/users/:id", userCtrl.findUserById);
router.post("/users/:id",userCtrl.updateUserById);
router.get("/users/:id/agents",userCtrl.getUserAgentsById);
router.get("/users/userLevel/:level", userCtrl.findUserByLevel);
router.post("/users/assign/manager", userCtrl.assignAgentsToManager);

/*********
 * 
 * RESPONSES
 *
**************/
router.get("/responses", resCtrl.findResponses);
router.post("/responses", resCtrl.createResponse);
router.get("/responses/:id", resCtrl.findResponseById);
router.get("/responses/users/:userId", resCtrl.getUserResponses);
router.post("/responses/dashboard/:userId", resCtrl.getDashboardStats);

module.exports  = router;