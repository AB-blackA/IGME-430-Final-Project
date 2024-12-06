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


const SubPageModel = mongoose.model('SubPage', SubPageSchema);
const ThreadModel = mongoose.model('Thread', ThreadSchema);

let HomeModel;
// create home model only if one doesn't exist yet
// we only want one
if (mongoose.models.Home) {
    HomeModel = mongoose.models.Home;
} else {
    HomeModel = mongoose.model('Home', HomeSchema);
}

const createHome = async () => {

    //check if exists
    const home = await HomeModel.findOne();

    if (!home) {

        const subPage1 = await SubPageModel.create({ name: 'DOTA2', entries: [] });
        const subPage2 = await SubPageModel.create({ name: 'StarCraft II', entries: [] });
        const subPage3 = await SubPageModel.create({ name: 'Team Fortress 2', entries: [] });
        const subPage4 = await SubPageModel.create({ name: 'Diablo II', entries: [] });
        // make a subpage for our new model. DOTA2 is by default.
        await HomeModel.create({ entries: [subPage1, subPage2, subPage3, subPage4] });
    }


    console.log(await HomeModel.findOne());
}

createHome();

module.exports = {
    ThreadModel,
    HomeModel,
    SubPageModel,
};
