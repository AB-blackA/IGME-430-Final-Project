const models = require('../models');

const { Profile } = models;

const profilePage = (req, res) => res.render('profile');

const editBio = (req, res) => {

    const bioString = `${req.body.bioString}`;

    // do something here to update the bio of the bio

    // there is nothing to return here because editing the bio is all done
    // within one page

}

const editAvatar = (req, res) => {

    const avatar = `${req.body.avatar}`;

    // do something here to update the avatar of the bio
    // the avatar is anticipated to be one of many default ones I'm including
    // within the application.

    // again, nothing to return here because editing the bio is all done within 
    // one page
}

modoule.exports = {
    profilePage,
    editBio,
    editAvatar
}