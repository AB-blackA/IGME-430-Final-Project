const models = require('../models');

const { ThreadModel, HomeModel, SubPageModel } = models;

console.log(`SubPageModel : ${SubPageModel}`);
console.log(`HomeModel : ${HomeModel}`);

// render the home page
const homePage = (req, res) => {
    return res.render('main');
};

// render a subpage based on subpagename
const subPagePage = (req, res) => {
    const subPageName = `${req.params.subPageName}`;


    return res.render(`subPage`, { subPageName });
};

// render a thread (posts) based on subpagepage
const postsPage = (req, res) => {
    const subPageName = `${req.params.subpageName}`;
    const threadName = `${req.params.threadName}`;

    return res.render(`subPage/${subPageName}/${threadName}`);
};

const getSubPageList = async (req, res) => {

    console.log('subpagelistfunction');

    try {

        console.log('before findone');
        // find homemodel. should be only one...
        const home = await HomeModel.findOne();

        console.log(home);

        if (!home) {
            return [];
        }

        // find all the subpages, grab their names, map them, return them
        const subPageNames = home.entries.map(subPage => subPage.name);

        return subPageNames;
    } catch (err) {
        console.error('Error fetching subpages', err);
        return [];
    }
}

// the following are dummy functions intented to be filled in later
// right now our res is just sending a message to indicate the endpoint is being
// reached. still needs error codes, json data, etc.

// i believe also before the return statement some data needs to be added
// in one of the schemas. see Account.js 'signup' for reference

// create a new subpage
const newSubPage = async (req, res) => {
    const subPageName = `${req.body.subPageName}`;
    const account = `${req.body.account}`;

    if (!subPageName) {
        return res.status(400).json({ error: 'SubPage Name cannot be Empty' });
    }
    if (!account) {
        return res.status(401).json({ error: 'You must be logged in to create a subpage' });
    }

    try {
        const emptyArray = [];
        const subPage = new SubPageModel({ subPageName, emptyArray });
        await subPage.save();

        return res.json({ redirect: `/subPage/${subPageName}` });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'SubPage already exists!' });
        }
        return res.status(500).json({ error: 'An error occured while creating page' });
    }

};

// create a new thread
const newThread = (req, res) => {
    const threadTitle = `${req.body.threadTitle}`;
    const subpageName = `${req.body.subPageName}`;

    return res.json({ redirect: `${subpageName, threadTitle}` });
};

// post to a thread
const postToThread = (req, res) => {
    const subpageName = `${req.body.subpageName}`;
    const threadTitle = `${req.body.threadTitle}`;
    const postContent = `${req.body.postContent}`;

    return res.json({ redirect: `${subpageName, threadTitle, postContent}` });
};

module.exports = {
    homePage,
    newSubPage,
    subPagePage,
    newThread,
    postsPage,
    postToThread,
    getSubPageList
};
