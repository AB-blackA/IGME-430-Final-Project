const models = require('../models');

const { Thread } = models;

// render the home page
const homePage = (req, res) => {
    res.render('home');
};

// render a subpage based on subpagename
const subpagePage = (req, res) => {
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

// create a new subpage
const newSubPage = (req, res) => {
    const newSubPageName = `${req.body.subPageName}`;
    return res.json({ redirect: `${newSubPageName}` });
};

// create a new thread
const newThread = (req, res) => {
    const threadTitle = `${req.body.threadTitle}`;
    const subpageName = `${req.params.subPageName}`;

    return res.json({ redirect: `${subpageName, threadTitle}` });
};

// post to a thread
const postToThread = (req, res) => {
    const subpageName = `${req.params.subpageName}`;
    const threadTitle = `${req.params.threadTitle}`;
    const postContent = `${req.body.postContent}`;

    return res.json({ redirect: `${subpageName, threadTitle, postContent}` });
};

module.exports = {
    homePage,
    newSubPage,
    subpagePage,
    newThread,
    postsPage,
    postToThread,
};
