initializeFirebase();
let db = firebase.firestore();
let dbSettings = { timestampsInSnapshots: true };
db.settings(dbSettings);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    let displayName = user.displayName;
    let email = user.email;
    let photoURL = user.photoURL;
    let uid = user.uid;
    let providerData = user.providerData;
  } else {
    location.href = ('login.html');
  }
});

const salesPerDay = () => {
  const today = new Date();

}
salesPerDay();