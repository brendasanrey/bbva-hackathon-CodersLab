initializeFirebase();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let photoURL = user.photoURL;
        let uid = user.uid;
        let providerData = user.providerData;
    } else {
        // User is signOut.
    }
});

document.getElementById('login-button').addEventListener('click', event => {
    event.preventDefault();
    let email = document.getElementById('email-field').value;
    let password = document.getElementById('password-field').value;
    loginUser(email, password);
});

document.getElementById('google-sign-in').addEventListener('click', event => {
    event.preventDefault();
    googleUserLogin();
});