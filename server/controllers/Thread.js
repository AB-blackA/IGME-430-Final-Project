/* Author: Andrew Black
 * Since: 12/3/24
 * controllers/Thread.js is the controller for anything related to the main functionality
 * of the site. This means gathering subpages, threads, and posts and allowing edits
 */

const models = require('../models');

const {
  ThreadModel, HomeModel, SubPageModel, PostModel,
} = models.Thread;

// render the home page
const homePage = (req, res) => res.render('main');

// render a subpage based on subpagename
const subPagePage = (req, res) => {
  const subPageName = `${req.params.subPageName}`;
  return res.render('subpage', { subPageName });
};

// render a thread (posts) based on subpagepage
const postsPage = (req, res) => {
  const subPageName = `${req.params.subPageName}`;
  const threadName = `${req.params.threadName}`;

  return res.render('thread', { subPageName, threadName });
};

// fetch thread data (including posts) for a given thread in a subpage
const threadData = async (req, res) => {
  try {
    const { threadName, subPageName } = req.query;

    if (!subPageName || !threadName) {
      return res.status(400).json({ error: 'Subpage name and thread name are required.' });
    }

    // find the subpage by name
    const subPage = await SubPageModel.findOne({ name: subPageName });
    if (!subPage) {
      return res.status(404).json({ error: 'Subpage not found.' });
    }

    // find the thread within the subpage
    const thread = subPage.entries.find((entry) => entry.name === threadName);
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found.' });
    }

    // return the thread and its posts
    return res.status(200).json({ thread });
  } catch (err) {
    console.error('Error fetching thread data', err);
    return res.status(500).json({ error: 'An error occurred while fetching thread data.' });
  }
};

// fetch threads for a subpage
const subPageData = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      // find the correct SubPageModel by name
      const subPage = await SubPageModel.findOne({ name });
      if (!subPage) {
        return res.status(404).json({ error: 'Subpage not found', threads: [] });
      }
      return res.status(200).json({ threads: subPage.entries });
    }
    return res.status(400).json({ error: 'Subpage name is required' });
  } catch (err) {
    console.error('Error fetching threads', err);
    return res.status(500).json({ error: 'An error occurred while fetching threads' });
  }
};

// fetch the list of subpages
const getSubPageList = async (req, res) => {
  try {
    const home = await HomeModel.findOne();
    if (!home) {
      return res.status(404).json({ home: [] });
    }
    const subPageNames = home.entries.map((subPage) => subPage.name);
    return res.json({ subPageNames });
  } catch (err) {
    console.error('Error fetching subpages', err);
    return res.status(500).json({ error: 'An error occurred while fetching subpages.' });
  }
};

// create a new subpage
const newSubPage = async (req, res) => {
  const subPageName = `${req.body.subPageName}`;

  console.log(subPageName);
  if (!subPageName) {
    return res.status(400).json({ error: 'SubPage Name cannot be Empty' });
  }

  try {
    const home = await HomeModel.findOne();
    if (!home) {
      return res.status(404).json({ home: [] });
    }

    const emptyArray = [];
    const subPage = new SubPageModel({ name: subPageName, entries: emptyArray });
    await subPage.save();

    home.entries.push(subPage);

    await home.save();

    console.log(home);

    return res.json({ redirect: `/subPage/${subPageName}` });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'SubPage already exists!' });
    }
    return res.status(500).json({ error: 'An error occurred while creating page' });
  }
};

// create a new thread
const newThread = async (req, res) => {
  const { subpageName, threadName } = req.body;

  console.log(`newThread ${subpageName}`);

  if (!subpageName || !threadName) {
    return res.status(400).json({ error: 'Subpage name and thread name are required.' });
  }

  try {
    const subPage = await SubPageModel.findOne({ name: subpageName });
    if (!subPage) {
      return res.status(404).json({ error: 'Subpage not found.' });
    }

    const newThreadData = new ThreadModel({ name: threadName, entries: [] });
    await newThreadData.save();

    subPage.entries.push(newThreadData);
    await subPage.save();

    return res.status(201).json({ message: 'Thread created successfully.', thread: newThread });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the thread.' });
  }
};

// create a new post in a thread
const newPost = async (req, res) => {
  const { threadName, postContent } = req.body;

  if (!threadName || !postContent) {
    return res.status(400).json({ error: 'Thread name and post content are required.' });
  }

  try {
    const thread = await ThreadModel.findOne({ name: threadName });
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found.' });
    }

    const newPostData = new PostModel({ entries: postContent });
    await newPostData.save();

    thread.entries.push(newPostData);
    await thread.save();

    console.log(`thread entries: ${thread.entries}`);

    return res.status(201).json({ message: 'Post created successfully.', post: postContent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the post.' });
  }
};

module.exports = {
  homePage,
  newSubPage,
  subPagePage,
  newThread,
  postsPage,
  newPost,
  getSubPageList,
  subPageData,
  threadData,
};
