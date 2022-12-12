const mongoose = require("mongoose");
const { schemaOptions } = require("../../utils/schemas");
const { PLACES } = require("../../../utils/fumoir/consts");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    picture: {
      type: String
    },
    start_date: {
      type: Date,
      required: false
    },
    end_date: {
      type: Date,
      required: false
    },
    booking_user: {
      // User who booked
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    guests: [
      {
        // Guest email addresses
        type: String
      }
    ],
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false
    }
  },
  schemaOptions
);

module.exports = EventSchema;
