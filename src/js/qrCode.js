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

getData();

document.getElementById('transactionCompleted').addEventListener('click', event => {
  event.preventDefault();
  const cartList = localStorage.getItem('cart');
  const totalPrice = localStorage.getItem('total');
  const cartListElements = cartList.split(',');
  cartListElements.forEach(product => {
    db.collection('products').doc(product).get()
      .then(element => {
        let leftQuantity = element.data().quantity;
        leftQuantity = leftQuantity - 1;
      });
  });
  const time = new Date();
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const actualDate = day + '/' + month + '/' + year;
  db.collection('sales').add({
    products: cartListElements,
    total: totalPrice,
    date: actualDate
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  localStorage.removeItem('cart');
  localStorage.removeItem('total');
  swal({
    title: "Venta Exitosa",
    text: "Grandioso",
    icon: "success",
    button: "Ok!",
  })
    .then(() => {
      location.href = ('home.html');
    });
});