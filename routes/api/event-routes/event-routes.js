const { response, request, Router } = require("express");
const {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
} = require("../../../controllers");

const router = Router();

/*
    ! event
    ! host +  api/events/getAllEvents/
*/

router.route("/").get(getAllEvents);
router.route("/").post(createNewEvent);
router.route("/:id").put(updateEvent);
router.route("/:id").delete(deleteEvent);

module.exports = router;
