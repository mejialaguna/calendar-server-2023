const router = require("express").Router();
const { addNewUser } = require("../../../controllers");

/*
  ! host +  api/auth/new-user
*/

router.route("/").post(addNewUser);

module.exports = router;
