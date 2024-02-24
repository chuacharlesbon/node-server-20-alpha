const mongoose = require('mongoose');

let myModelSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile Number is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    modelData: [
        {
            remarks: {
                type: String,
            },
            createdOn: {
                type: Date,
                default: new Date()
            },
        }
    ],
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
    },
});

module.exports = mongoose.model("MyModel", myModelSchema)