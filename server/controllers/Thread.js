const models = require('../models');

const { Thread } = models;

// render the home page
const homePage = (req, res) => {
    res.render('home');
};

// render a subpage based on subpagename
const subPagePage = (req, res) => {
    const subPageName = `${req.params.subPageName}`;

    res.render('subPage', { subPageName });
};

// render a thread (posts) based on subpagepage
const postsPage = (req, res) => {
    const subPageName = `${req.params.subpageName}`;
    const threadName = `${req.params.threadName}`;

    res.render('thread', { subPageName, threadName });
};

// the following are dummy functions intented to be filled in later
// right now our res is just sending a message to indicate the endpoint is being
// reached. still needs error codes, json data, etc.

// i believe also before the return statement some data needs to be added
// in one of the schemas. see Account.js 'signup' for reference

// create a new subpage
const newSubPage = (req, res) => {
    const subPageName = `${req.body.subPageName}`;

    if (!subPageName) {
        return res.status(400).json({ error: 'SubPage Name cannot be Empty' });
    }

    return Thread.authenticate(subPageName, (err, account) => {
        if (err) {
            return res.status(401).json({ error: 'Error occured while creating subpage' });
        }

        if (!account) {
            return res.status(401).json({ error: 'You must be logged in to create a subpage' });
        }




    });

    return res.json({ redirect: `${subPageName}` });
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
};
