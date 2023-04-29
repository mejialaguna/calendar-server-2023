const { Router, response, request } = require("express");

const router = Router();

const { validateToken, fieldValidators } = require("../../../middlewares");

const { check } = require("express-validator");

const getAllEventsRoute = require("./event-routes");
const createNewEvent = require("./createNewEvent-routes");
const updateEvent = require("./updateEvent-routes");
const deleteEvent = require("./deleteEvent-routes");

/*
    ! event
    ! host +  api/events/ any of the routes bellow
*/

/*
   ! validateToken middleware is responsible for checking if the token is valid before hitting the routes endpoint

   ! this is a different way to use the middleware, by adding the middleware inside its own router.use(validateToken), check the first way how the middleware was implemented inside the AUTH route.
*/

router.use(validateToken); // ! all of the routes need to pass trough the middleware (validateToken) before they can access the routes and only if the token is valid.

router.use("/getAllEvents", getAllEventsRoute);

router.use(
  "/createEvent",
  [
    // !!! middleware
    check("title", "title is required").not().isEmpty(),
    check("notes", "").optional(),
    check("start", "Please include a valid email").not().isEmpty(),
    check("end", "Please include a valid email").not().isEmpty(),
    fieldValidators, // !calling this function after every check
  ],
  createNewEvent
);

router.use(
  "/updateEvent",
  [
    // !!! middleware
    check("title", "title is required").not().isEmpty(),
    check("notes", "").optional(),
    check("start", "Please include a valid email").not().isEmpty(),
    check("end", "Please include a valid email").not().isEmpty(),
    fieldValidators, // !calling this function after every check
  ],
  updateEvent
);
router.use("/deleteEvent", deleteEvent);

module.exports = router;
