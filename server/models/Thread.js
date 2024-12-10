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

let SubPageModel = {};
let ThreadModel = {};
let HomeModel = {};

SubPageModel = mongoose.model('SubPage', SubPageSchema);
ThreadModel = mongoose.model('Thread', ThreadSchema);

HomeModel = mongoose.models.Home || mongoose.model('Home', HomeSchema);

const createHome = async () => {
  try {
    const home = await HomeModel.findOne();

    if (!home) {
      const subPage1 = await SubPageModel.create({ name: 'DOTA2', entries: [] });
      const subPage2 = await SubPageModel.create({ name: 'StarCraft II', entries: [] });
      const subPage3 = await SubPageModel.create({ name: 'Team Fortress 2', entries: [] });
      const subPage4 = await SubPageModel.create({ name: 'Diablo II', entries: [] });
      const subPage5 = await SubPageModel.create({ name: 'Overwatch II', entries: [] });

      await HomeModel.create({ entries: [subPage1, subPage2, subPage3, subPage4, subPage5] });
    }
  } catch (error) {
    console.error('Error in createHome:', error);
  }
};

createHome();

console.log('Mongoose models:', mongoose.models);

module.exports = {
  ThreadModel,
  HomeModel,
  SubPageModel,
};
