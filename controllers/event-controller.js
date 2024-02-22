const { response, request } = require('express');

const { Event } = require('../models');

const getAllEvents = async (req, res = response) => {
  try {
    const userId = req?.userId;
    if (!!userId) {
      // !! we are populating user data inside the populate first parameter is  pointing to the user model and the second parameter is specifying to the which data we need to populate , instead of populating the whole user model.
      const event = await Event.find().populate('user', 'username email');

      res.status(200).json({
        ok: true,
        message: 'getting Events controllers again',
        event,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while fetching all Events from DB -> ${err.message}`,
    });
  }
};

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
        message: 'new event created successfully',
        event: {
          ...userMetaData,
          eventData: event,
        },
      });
    }

    res.status(401).json({ ok: false, message: 'user not Authenticated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while creating new event -> ${err.message}`,
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const uid = req.userId;

  try {
    const events = await Event.findById(eventId);

    if (!events) {
      return res.status(404).json({
        ok: false,
        msg: 'this event does not exist',
      });
    }

    if (events.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You dont have the privileges to update this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const newUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      message: 'event updated',
      newUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'talk to your administrator',
    });
  }
};

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
        message: 'event delete',
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
