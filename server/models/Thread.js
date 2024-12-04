const mongoose = require('mongoose');
const _ = require('underscore');

// entry is the post
// user displays the user and avatar
const PostSchema = new mongoose.Schema({
    entry: String,
    user: String,
});

const ThreadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
    },
    entries: [PostSchema],
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

ThreadSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    entries: doc.entries,
});

ThreadModel = mongoose.model('Thread', ThreadSchema);
module.exports = ThreadModel;