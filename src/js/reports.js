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
  db.collection('sales').get()
    .then(sales => {
      drawSalesList(sales);
    });

}

const drawSalesList = (listOfSales) => {
  const today = new Date();
  const dayToday = today.getDate();
  const monthToday = today.getMonth() + 1;
  const yearToday = today.getFullYear();
  const todaysDate = dayToday + '/' + monthToday + '/' + yearToday;
  let dayTotal = 0;
  listOfSales.forEach(sale => {
    if (todaysDate === sale.data().date) {
      document.getElementById('listOfSales').innerHTML += `<li class="list-group-item">
      <b>${sale.id}</b>
      <p>$ ${sale.data().total}</p>
    </li>`;
    }
  });
};

salesPerDay();