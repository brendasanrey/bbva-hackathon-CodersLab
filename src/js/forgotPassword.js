initializeFirebase();

document.getElementById('reset-password-button').addEventListener('click', event => {
    event.preventDefault();
    let emailToResetPassword = document.getElementById('email-field').value;
    passwordReset(emailToResetPassword);
});