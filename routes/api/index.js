const router = require("express").Router(); // ! step 1 request express.Router()

const authRoute = require("./auth-routes");

const getEvents = require("./event-routes");

/*
    ! auth
    ! host +  api/auth
*/
router.use("/auth", authRoute); // ! everything inside the authRoute folder will be use for /auth route, in this case this is the next level up route /api/auth.

/*
    ! event
    ! host +  api/events
*/

// router.get("/events", (req, res) => {
//   return res.status(200).json({ ok: true, message: "events route" });
// });

router.use("/events", getEvents);

module.exports = router;
