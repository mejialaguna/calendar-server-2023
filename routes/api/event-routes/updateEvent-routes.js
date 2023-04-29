const { Router } = require("express");
const { updateEvent } = require("../../../controllers");

const router = Router();

/*
    ! event
    ! host +  api/events/update/id
*/

router.route("/:id").put(updateEvent);

module.exports = router;
