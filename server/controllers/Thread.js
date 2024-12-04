const models = require('../models');

const { Thread } = models;

// this code is taken from router.js
/* // main is the main page that users navigate to. This is what would contain all the Subpage links.
// An example would be having links to the subpages 'Legend of Zelda', 'Pokemon', and 'Minecraft'. 
// GET leads you here. POST would allow you to create a new Subpage.
app.get('/main', mid.requiresSecure, mid.requiresLogout, controllers.Home.homePage);
app.post('/main', mid.requiresSecure, mid.requiresLogout, controllers.Home.newSubPage);

// subpages is different from the main page in that a Subpage is specific to an area. For example,
// 'Minecraft' might be a subpage and contain threads related to Minecraft. You would want to 
// GET the subpage, and possibly POST a new thread to the subpage 
app.get('/subpage', mid.requiresSecure, mid.requiresLogout, controllers.SubPage.subpagePage);
app.post('/subpage', mid.requiresSecure, mid.requiresLogout, controllers.SubPage.newThread);

// posts is what loads in the specific thread. For example, in a Mincreaft subthread, you might
// want to GET the posts from a thread titled 'Best Way to Mine Diamonds?' as well as POST
// a 'post' (reply, comment, etc.) to that thread
app.get('/posts', mid.requiresSecure, mid.requiresLogout, controllers.Thread.thread);
app.post('/posts', mid.requiresSecure, mid.requiresLogout, controllers.Thread.post); */



const homePage = (req, res) => res.render('home');

const subPage = (req, res) => res.render('subPage');

const threadPage = (req, res) => res.render('thread');
