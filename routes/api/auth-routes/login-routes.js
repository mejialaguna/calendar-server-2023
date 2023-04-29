const router = require("express").Router();
const { loginUser } = require("../../../controllers");

/*
  ! host +  api/auth/login
*/

router.route("/").post(loginUser);

module.exports = router;
