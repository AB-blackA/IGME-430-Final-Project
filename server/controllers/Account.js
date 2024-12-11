/* Author: Austin, Andrew
 * Since: unknown
 * controllers/Account.js is the controller for anything related to the user Account.
 * that means logging in, out, signing up, and changing the password
 */

const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const signupPage = (req, res) => res.render('signup');

const changePasswordPage = (req, res) => res.render('changepassword');

// logout
const logout = (req, res) => {
  req.session.isLoggedIn = false;
  req.session.destroy();
  res.redirect('/');
};

// login
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);
    req.session.isLoggedIn = true;

    return res.redirect('main');
  });
};

// signup
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);

    return res.redirect('main');
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

// changepassword
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  try {
    const account = await Account.findById(req.session.account._id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found!' });
    }

    return Account.authenticate(account.username, currentPassword, async (
      err,
      authenticatedAccount,
    ) => {
      if (err || !authenticatedAccount) {
        return res.status(401).json({ error: 'Current password is incorrect!' });
      }

      const newHash = await Account.generateHash(newPassword);

      account.password = newHash;
      await account.save();

      return res.redirect('main');
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while changing the password.' });
  }
};

module.exports = {
  loginPage,
  signupPage,
  logout,
  login,
  signup,
  changePassword,
  changePasswordPage,
};
