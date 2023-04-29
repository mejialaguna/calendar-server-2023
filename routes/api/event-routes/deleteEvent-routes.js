const { Router } = require("express");
const { deleteEvent } = require("../../../controllers");

const router = Router();

/*
    ! event
    ! host +  api/events/deleteEvent/id
*/

router.route("/:id").delete(deleteEvent);

module.exports = router;
