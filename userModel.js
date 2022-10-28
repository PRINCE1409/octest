const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "User must enter his first name"]
    },
    lastName: {
        type: String,
        required: [true, "User must enter his last name"]
    },
    email: {
        type: String,
        required: [true, "User must enter his email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "User must enter his password"],
        minlength: 5,
        select: false
    },
})

// userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
//     bcrypt.compare(candidatePassword, userPassword);
const User = mongoose.model("User", userSchema);

module.exports = User;