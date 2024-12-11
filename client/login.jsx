/* Author: Austin, Andrew Black
 * Since: unknown
 * login.jsx is the script page for handling multiple handlebars, namely login, signup, and changepassword
 */

const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');

// handles logging in
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    console.log(pass, username);

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });
    return false;
}

// handles signing up
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });

    return false;
}

// handles changing password
const handleChangePassword = (e) => {
    e.preventDefault();
    helper.hideError();

    const currentPassword = e.target.querySelector('#currentPass').value;
    const newPassword = e.target.querySelector('#newPass').value;
    const newPasswordConfirm = e.target.querySelector('#newPassConfirm').value;

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (newPassword !== newPasswordConfirm) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { currentPassword, newPassword, newPasswordConfirm });
    return false;
}

// the following are all the windows 

const LoginWindow = (props) => {
    return (
        <form id='loginForm'
            name='loginForm'
            onSubmit={handleLogin}
            action='/login'
            method='POST'
            className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='password' name='pass' placeholder='password' />
            <input className='formSubmit' type='submit' value='Sign in' />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id='signupForm'
            name='signupForm'
            onSubmit={handleSignup}
            action='/signup'
            method='POST'
            className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='password' name='pass' placeholder='password' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass2' type='password' name='pass2' placeholder='retype password' />
            <input className='formSubmit' type='submit' value='Sign up' />
        </form>
    );
};

const ChangePasswordWindow = (props) => {
    return (
        <form id='changePasswordForm'
            name='changePasswordForm'
            onSubmit={handleChangePassword}
            action='/changePassword'
            method='POST'
            className='mainForm'
        >
            <label htmlFor='currentPass'>Current Password: </label>
            <input id='currentPass' type='password' name='currentPassword' placeholder='current password' />
            <label htmlFor='newPass'>New Password: </label>
            <input id='newPass' type='password' name='newPassword' placeholder='new password' />
            <label htmlFor='newPassConfirm'>Confirm New Password: </label>
            <input id='newPassConfirm' type='password' name='newPasswordConfirm' placeholder='confirm new password' />
            <input className='formSubmit' type='submit' value='Change Password' />
        </form>
    );
};

// this looks through any page that has the proper buttons and adds the event listeners
const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const changePasswordButton = document.getElementById('changePasswordButton'); 

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

    changePasswordButton.addEventListener('click', (e) => {  
        e.preventDefault();
        root.render(<ChangePasswordWindow />);
        return false;
    });

    root.render(<LoginWindow />);
};

window.onload = init;
