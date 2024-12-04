const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

// these are for single threads within a subpage
// entry is the post
// user displays the user and avatar
const PostSchema = new mongoose.Schema({
    entry: String,
    user: String,
});

// forum is the name of the subpage a thread belongs to
const ThreadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
        set: setName,
    },
    entries: [PostSchema],
    forum: {
        type: String,
        required: true,
        set: setName,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

// this is for a subpage. note its entries is all that
// of thread schema
const SubPageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
        set: setName,
    },
    entries: [ThreadSchema],

});

// this is for the homepage
// all that should matter is the amount of SubPages available
const HomeSchema = new mongoose.Schema({
    entries: [SubPageSchema],
});

HomeSchema.statics.toAPI = (doc) => ({
    entries: doc.entries,
});

SubPageSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    entries: doc.entries,
});

ThreadSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    entries: doc.entries,
});

const HomeModel = mongoose.model('Home', HomeSchema);
const SubPageModel = mongoose.model('SubPage', SubPageSchema);
const ThreadModel = mongoose.model('Thread', ThreadSchema);
module.exports = {
    ThreadModel,
    HomeModel,
    SubPageModel,
};
