// Initialize Firebase //
window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyA7qiRUQytS3juj6Mng-6KO_aS4rgwMRe0",
    authDomain: "bbva-bancomer-60b59.firebaseapp.com",
    databaseURL: "https://bbva-bancomer-60b59.firebaseio.com",
    projectId: "bbva-bancomer-60b59",
    storageBucket: "bbva-bancomer-60b59.appspot.com",
    messagingSenderId: "559114979224"
  });
};


// Register new Account //
window.newAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      verifyAccountWithEmail();
      alert('Se ha enviado un correo a tu email para verificar tu cuenta.');
      signOutUser();
      location.href = ('../index.html');
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/invalid-email') {
        alert('Por favor, ingresa un correo electrónico válido.');
      } else if (errorCode === 'auth/weak-password') {
        alert('Por favor, ingresa una contraseña.');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Usuario ya registrado, por favor verifica tus datos.');
      }
    });
};


// Send email to verify email account //
window.verifyAccountWithEmail = () => {
  let user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      console.log('Se envió mail');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};


// Login function //
window.loginUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      location.href = ('home.html');
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Por favor, verifica tu contraseña.');
      } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email' || errorCode === 'auth/argument-error') {
        alert('Por favor verifica tu usuario o Registrate para poder iniciar sesión.');
      } else if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
    });
};

// Google Sign-In //
window.googleUserLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      location.href = ('home.html');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('El correo ya ha sido registrado');
      }
      // ...
    });
};

// LogOut function //
window.signOutUser = () => {
  firebase.auth().signOut()
    .then(() => {
      location.href = ('login.html');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};

// Reset password //
window.passwordReset = (userEmail) => {
  let auth = firebase.auth();

  auth.sendPasswordResetEmail(userEmail)
    .then(() => {
      // Email sent.
      alert('Se ha enviado un mail a tu correo para poder recuperar tu contraseña.');
      location.href = ('../index.html');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
};

// Creating profile //
window.createUserProfileWithEmail = (name, email, location, photo) => {
  db.collection('users').add({
    userName: name,
    userEmail: email,
    city: location,
    profilePhoto: photo
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


window.listProducts = () => {
  dbRef = db.collection('products').orderBy('name', 'asc');
  dbRef.get()
    .then(products => {
      products.forEach(product => {
        drawProduct(product.id, product.data());
      });
    });
};

window.listCategories = () => {
  dbRef = db.collection('products').orderBy('category', 'asc');
  dbRef.get()
    .then(products => {
      let categories = [];
      products.forEach(product => {
        const data = product.data();
        console.log(data.id);
        const currentCategorie = data.category;
        const categoryAlreadyListed = categories.indexOf(currentCategorie);
        if (categoryAlreadyListed === -1) {
          categories.push(currentCategorie);
        }
      });
      console.log(categories);
    });
}

window.searchProduct = (search) => {
  dbRef = db.collection('products').orderBy('name', 'asc');
  dbRef.get()
    .then(products => {
      products.forEach(product => {
        const upperSearch = search.toUpperCase();
        const upperCategory = product.data().category.toUpperCase();
        const searchResult = upperCategory.indexOf(upperSearch);
        if (searchResult !== -1) {
          console.log(product.data());
        } else {
          const upperName = product.data().name.toUpperCase();
          const searchResult = upperName.indexOf(upperSearch);
          if (searchResult !== -1) {
            console.log(product.data());
          } else {
            const upperPrice = product.data().price.toUpperCase();
            const searchResult = upperPrice.indexOf(upperSearch);
            if (searchResult !== -1) {
              console.log(product.data());
            }
          }
        }
      })
    })
};

window.getData = () => {
  fetch('https://raw.githubusercontent.com/sanrey254/bbva-hackathon-CodersLab/master/src/docs/data.json').then(result => result.json())
    .then(result => {
      drawQrCode(result);
    })
}

window.drawQrCode = (result) => {
  const resultToString = JSON.stringify(result);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${resultToString}`;
  console.log(url);
  document.getElementById('code').src = url;
}