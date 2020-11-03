const router = require("express").Router();
/********
 *
 * CTRLS
 *
 **********/
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const authorized = [authCtrl.loginRequired, authCtrl.isValidToken];
router.get('/', (req, res)=>{
    res.send("welcome")
})
/*****
 *
 * AUTH
 *
 ********/
router.post("/auth/login", authCtrl.login);
router.post("/auth/register", authCtrl.registerUser);

/******
 *
 * USERS
 *
 ********/
router.get("/users", userCtrl.findUsers);
router.get("/users/:id", userCtrl.findUserById);
router.post("/users/userLevel", userCtrl.findUserByLevel);

module.exports = router;
