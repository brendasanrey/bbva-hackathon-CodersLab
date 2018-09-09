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

const drawSummary = () => {
  const cartList = localStorage.getItem('cart');
  const totalPrice = localStorage.getItem('total');
  const cartListElements = cartList.split(',');
  cartListElements.forEach(element => {
    db.collection('products').doc(element).get()
      .then(product => {
        document.getElementById('summaryList').innerHTML += `
                  <li class="list-group-item">
                    <b>$ ${product.data().name}</b>
                    <p>$ ${product.data().price}</p>
                  </li>`;
      });
  });
  document.getElementById('summaryListTotal').innerHTML += ` 
  <li class="list-group-item">
  Total: 
  <b>$ ${totalPrice}</b>
</li>`;
}

drawSummary();

document.getElementById('generateQR').addEventListener('click', event => {
  event.preventDefault();
  location.href = ('code.html');
})