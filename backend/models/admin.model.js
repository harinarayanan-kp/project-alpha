const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
    {
        email: {
            type: email,
            required: [true, "Please enter email."],
            unique: true, 
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."]
        },
        password: {
           type: password,
           required: [true, "Please enter password."],
           minlength: [8, "Password must be at least 8 characters long."],
           maxlength: [20, "Password cannot exceed 20 characters."], 
           validate: {
             validator: function (value) {
               return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
             },
             message:
               "Password must contain at least one uppercase letter, one number, and one special character.",
           },
        },
    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;