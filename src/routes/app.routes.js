const router   = require("express").Router();
/**************
 CONTROLLERS
*****************/
const authCtrl = require('../controllers/auth.controller');

/***********
 AUTH
*****************/
router.get('/',authCtrl.login,(req,res) =>{
    res.json('Yellow');
})
router.post("/auth/login", authCtrl.login);
router.post("/auth/register", authCtrl.registerUser);

module.exports  = router;