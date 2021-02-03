const {Router} = require("express");
//const pool = require("../database");
//const passport = require("passport");
const router = Router();

router.get('/', (req, res)=>{
    res.json({message : "Bienvenido al sistema de seguridad" });
});

// router.post('/', passport.authenticate('local-signin',{
//     successRedirect : '/dashboard',
//     failureRedirect : '/',
//     failureMessage : true
// }));

module.exports = router;