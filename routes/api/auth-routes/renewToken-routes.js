const router = require("express").Router();
const { revalidateToken } = require("../../../controllers");

/*
  ! host +  api/auth/renew-token
*/

router.route("/").get(revalidateToken);

module.exports = router;
