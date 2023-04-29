const { response, request, Router } = require("express");
const { createNewEvent } = require("../../../controllers");

const router = Router();

/*
    ! event
    ! host +  api/events/createEvent
*/
router.route("/").post(createNewEvent);

module.exports = router;
