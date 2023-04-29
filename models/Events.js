const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  notes: {
    type: "string",
    required: false,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/*
 !! changing how the key value look like on the response object
 !! extract what i would like to change into how it should be.
*/
eventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.messageId = _id;
  return object;
});

const Event = model("Event", eventSchema);

module.exports = { Event };
