const mongoose = require('mongoose');

const myFileSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('MyFile', myFileSchema);