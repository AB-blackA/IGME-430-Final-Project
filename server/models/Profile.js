const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  bio: {
    type: String,
  },
  user: {
    type: String,
  },
});

ProfileSchema.statics.toAPI = (doc) => ({
  avatar: doc.avatar,
  bio: doc.bio,
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = {
  ProfileModel,
};
