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

let cart = [];
let total = 0;

const drawProduct = (id, product) => {
  const list = document.getElementById('listOfProducts');
  list.innerHTML += `<div class="col-12 col-sm-4 col-md-3 mt-3">
    <div class="card mb-4">
    <img class="card-img-top" src="https://dummyimage.com/500x300/000000/fff" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <span>${product.price}</span>
    </div>
    <div class="card-body">
        <button class="btn no-btn" onclick="addToCart('${id}', '${product.price}')"><i class="fas fa-plus-circle"></i> Agregar</button>
        <button class="btn no-btn"><i class="fas fa-info-circle"></i> Detalles</button>
    </div>
</div>
</div>`;
};

document.getElementById('summaryList').addEventListener('click', event => {
  event.preventDefault();
  location.href = ('summary.html');
  localStorage.setItem('cart', cart);
  localStorage.setItem('total', total);
});

const addToCart = (product, price) => {
  cart.push(product);
  const priceNumber = parseInt(price);
  total = total + priceNumber;
}

listProducts();


