const { addNewUser, loginUser, revalidateToken } = require("./auth-controller");

const {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} = require("./event-controller");

module.exports = {
  addNewUser,
  createNewEvent,
  deleteEvent,
  getAllEvents,
  loginUser,
  revalidateToken,
  updateEvent,
};
