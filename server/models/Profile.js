const mongoose = require('mongoose');
const _ = require('underscore');

const ProfileSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    }
});

ProfileSchema.statics.toAPI = (doc) => ({
    avatar: doc.avatar,
    bio: doc.bio
})