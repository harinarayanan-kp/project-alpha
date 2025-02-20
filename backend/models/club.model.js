const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter club name."],
            unique: true, 
        },
    },
    {
        timestamps: true
    }
)

const Club= mongoose.model("Club", ClubSchema);
module.exports = Club;