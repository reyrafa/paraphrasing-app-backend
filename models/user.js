const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
