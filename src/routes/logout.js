const {Router} = require("express");
const router = Router();

router.get('/', (req, res, next) => {
    req.logout();
    res.redirect('/login');
  });

  module.exports = router;
