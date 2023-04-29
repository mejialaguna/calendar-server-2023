const router = require("express").Router();
const newUserRoute = require("./newUser-routes");
const renew = require("./renewToken-routes");
const login = require("./login-routes");
const { check } = require("express-validator");

const { fieldValidators } = require("../../../middlewares/fieldValidators");
const { validateToken } = require("../../../middlewares/validateJwToken");

/*
    ! api / auth /  
    ! host +  api/auth + any of  the routes below.
*/

router.use(
  "/login",
  [
    // !!! middleware
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required to contain more than 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 }),
    fieldValidators, // !calling this function after every check
  ],
  login
);

router.use(
  "/new-user",
  [
    // !!! middleware
    check("username", "username is required").not().isEmpty(),
    check("password", "Password is required to contain more than 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 }),
    check("email", "Please include a valid email").isEmail(),
    fieldValidators, // !calling this function after every check
  ],
  newUserRoute
);

router.use("/renew-token", validateToken, renew);

module.exports = router;

// ! END OF FILE
