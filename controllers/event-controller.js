const { response, request } = require("express");

const { Event } = require("../models");

// todo <============================== get all events===================================>

const getAllEvents = async (req, res = response) => {
  try {
    const userId = req?.userId;
    if (!!userId) {
      // !! we are populating user data inside the populate first parameter is  pointing to the user model and the second parameter is specifying to the which data we need to populate , instead of populating the whole user model.
      const event = await Event.find().populate("user", "username email");

      res.status(200).json({
        ok: true,
        message: "getting Events controllers again",
        event,
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while fetching all Events from DB -> ${err.message}`,
    });
  }
};

// todo <============================== create new event===================================>

const createNewEvent = async (req = request, res = response) => {
  const userId = req?.userId;

  const body = req?.body;

  const userMetaData = {
    username: req?.username,
    userEmail: req?.userEmail,
    userId: req?.userId,
  };

  try {
    if (!!userId) {
      let event = new Event(body);
      event.user = userId;

      await event.save();

      return res.status(200).json({
        ok: true,
        message: "new event created successfully",
        event: {
          ...userMetaData,
          eventData: event,
        },
      });
    }

    res.status(401).json({ ok: false, message: "user not Authenticated" });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while creating new event -> ${err.message}`,
    });
  }
};

// todo <============================== update event===================================>

const updateEvent = async (req = request, res = response) => {
  const messageId = req?.params?.id;

  const userMetaData = {
    username: req?.username,
    userEmail: req?.userEmail,
    userId: req?.userId,
    messageId,
  };
  const findMessage = await Event.findById(messageId);

  try {
    if (!findMessage) {
      return res.status(404).json({
        ok: false,
        message: `no message found with this Id ${messageId}`,
      });
    }

    if (!!findMessage && findMessage?.user.toString() === req?.userId) {
      const update = req?.body;

      // !! needs 3 arguments id , new update and the options
      const updatedEvent = await Event.findByIdAndUpdate(messageId, update, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        ok: true,
        message: "event updated",
        ...userMetaData,
        newUpdate: updatedEvent,
      });
    }

    res.status(401).json({
      ok: false,
      message: `user ${req?.username} is not the creator of this event, not authorized to update this event`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while updating the event -> ${err.message}`,
    });
  }
};

// todo <============================== delete event===================================>

const deleteEvent = async (req = request, res = response) => {
  const messageId = req?.params?.id;

  const findMessage = await Event.findById(messageId);

  try {
    if (!findMessage) {
      return res.status(404).json({
        ok: false,
        message: `no message found with this Id ${messageId}`,
      });
    }

    if (!!findMessage && findMessage?.user.toString() === req?.userId) {
      const deletedEvent = await Event.findByIdAndDelete(messageId);

      return res.status(200).json({
        ok: true,
        message: "event delete",
      });
    }

    res.status(401).json({
      ok: false,
      message: `user ${req?.username} is not the creator of this event, not authorized to delete this event`,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while creating a new event -> ${err.message}`,
    });
  }
};

module.exports = { getAllEvents, createNewEvent, updateEvent, deleteEvent };
