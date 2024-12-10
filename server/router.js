const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // main is the main page that users navigate to. This is what would contain all the Subpage links.
  // An example would be having links to the subpages 'Legend of Zelda', 'Pokemon', and 'Minecraft'.
  // GET leads you here. POST would allow you to create a new Subpage.
  app.get('/main', mid.requiresSecure, controllers.Thread.homePage);
  app.post('/main', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newSubPage);

  // endpoint for getting list of subpages. Note that this is not the pages themeselves, but just
  // the list of them (if you wanted say their names to load in on the main page...)
  app.get('/getSubPageList', mid.requiresSecure, controllers.Thread.getSubPageList);

  // subpages is different from the main page in that a Subpage is specific to an area. For example,
  // 'Minecraft' might be a subpage and contain threads related to Minecraft. You would want to
  // GET the subpage (like `/subpage/Minecraft`), and possibly POST a new thread to the subpage
  // (like `/subpage/Minecraft`).
  app.get('/subPage/:subPageName', mid.requiresSecure, controllers.Thread.subPagePage);

  // this should be like above, but for a specific thread
  app.get('/subPage/:subPageName/:threadName', mid.requiresSecure, controllers.Thread.postsPage);

  // make a new subpage
  app.post('/newSubPage', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newSubPage);

  // make a thread
  app.post('/newThread', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newThread);

  // get data about subpage
  app.get('/subPageData', mid.requiresSecure, controllers.Thread.subPageData);

  app.get('/threadData', mid.requiresSecure, controllers.Thread.threadData);

  app.post('/newPost', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newPost);

  // profile is the profile page for any given user. GET allows you to see their profile page, which
  // would likely contain a BIO and Avatar. POST is a way to update your profile page for a new bio
  // app.get('/profile', mid.requiresSecure, controllers.Profile.profilePage);
  // app.post('/profile', mid.requiresSecure, mid.requiresLogin, controllers.Profile.updateBio);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Thread.homePage);

  // catch all
  app.use((req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;
