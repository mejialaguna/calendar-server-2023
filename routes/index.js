const router = require("express").Router(); // ! step 1 request express.Router()
const apiRoutes = require("./api");

/*
  !! this is the main route joining all other routes. like 
   !! {
        ! api/auth/login
        ! api/auth/new-user
        ! api/auth/renew-token
   !! }
*/
router.use("/api", apiRoutes); // ! everything inside the apiRoutes folder will be use for /api route, in this case just the /api.

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error route does exist!</h1>"); // !return 404 error if no route found.
});

module.exports = router;
