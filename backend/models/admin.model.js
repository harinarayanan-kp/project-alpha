const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter email."],
            unique: true, 
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."]
        },
        password: {
           type: String,
           required: [true, "Please enter password."],
           minlength: [8, "Password must be at least 8 characters long."],
        //    validate: {
        //     validator: (value) => 
        //         /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
        //     message:
        //         "Password must contain at least one uppercase letter, one number, and one special character.",
        // },
        },
        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "club",
            required: [true, "Admin must be part of a club"]
        }
    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;