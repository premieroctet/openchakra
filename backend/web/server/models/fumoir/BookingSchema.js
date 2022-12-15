const mongoose = require("mongoose");
const { schemaOptions } = require("../../utils/schemas");
const { PLACES } = require("../../../utils/fumoir/consts");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    table_number: {
      type: String,
      required: false // required: true,
    },
    start_date: {
      type: Date,
      required: false // required: true,
    },
    end_date: {
      type: Date,
      required: false // required: true,
    },
    booking_user: {
      // User who booked
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false // required: true,
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
    people_count: {
      type: Number
    },
    comments: {
      type: String
    },
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false // required: true,
    }
  },
  schemaOptions
);

BookingSchema.virtual("orders", {
  ref: "order", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "booking" // is equal to foreignField
});

module.exports = BookingSchema;
