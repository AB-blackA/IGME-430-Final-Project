/* Author: Austin, Andrew Black
 * Since: unknown, modified by Andrew 12/3/24
 * router.js has all the routes. Of the ones I haven't changed are loging, signup, logout, and /
 * from domomaker. The rest are new
 */

const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // new functionality for changing password
  app.get('/changePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePasswordPage);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePassword);

  // main is the main page that users navigate to. This is what would contain all the Subpage links.
  // An example would be having links to the subpages 'Legend of Zelda', 'Pokemon', and 'Minecraft'.
  // /main is the render
  app.get('/main', mid.requiresSecure, controllers.Thread.homePage);
  // make a new subpage
  app.post('/newSubPage', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newSubPage);
  // endpoint for getting list of subpages. Note that this is not the pages themeselves, but just
  // the list of them (if you wanted say their names to load in on the main page...)
  app.get('/getSubPageList', mid.requiresSecure, controllers.Thread.getSubPageList);

  // subpages is different from the main page in that a Subpage is specific to an area. For example,
  // 'Minecraft' might be a subpage and contain threads related to Minecraft. You would want to
  // /subPage is a render
  app.get('/subPage/:subPageName', mid.requiresSecure, controllers.Thread.subPagePage);
  // make a thread
  app.post('/newThread', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newThread);
  // get data about subpage
  app.get('/subPageData', mid.requiresSecure, controllers.Thread.subPageData);

  // this should be like above, but for a specific thread
  app.get('/subPage/:subPageName/:threadName', mid.requiresSecure, controllers.Thread.postsPage);
  app.post('/newPost', mid.requiresSecure, mid.requiresLogin, controllers.Thread.newPost);

  app.get('/threadData', mid.requiresSecure, controllers.Thread.threadData);

  // default is the same as going to /main
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Thread.homePage);

  // catch all for returning a 404
  // i found this by Nikhil Singh on StackOverflow in this thread
  // https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes
  app.use((req, res) => {
    res.status(404).render('404');
  });
};

module.exports = router;
