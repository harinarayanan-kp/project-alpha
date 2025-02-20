const mongoose = require("mongoose");
const { link } = require("../routes/admin.route");
const EventSchema = mongoose.Schema(
  {
    ename: {
      type: String,
      required: [true, "Please enter name. "],
      unique: true,
      uppercase: true,
    },
    date: {
      type: Date,
      required: [true, "Please enter event date. "],
    },
    time: { type: String, match: /^([0-1]\d|2[0-3]):([0-5]\d)$/ },
    description: {
      type: String,
    },
    club_name: { type: String, required: [true, "Please enter club name. "] },
    venue: { type: String, required: [true, "Please enter venue. "] },
    socialmedia_link: { type: String },
    reg_fee: { type: Number },
    reg_link: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})+([/?].*)?$/i.test(value);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    contact: {type: Number},
    club: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "club",
                required: [true, "Event must be part of a club"]
    },
    admin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "admin",
                required: [true, "Event must have an admin"]
            }

  },
  {
    timestamps: true,
  }
);

// date
// time
// description
// clubname
// venue
// details
// instalink
// reg_link
// reg_fee

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
