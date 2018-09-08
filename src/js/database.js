bancomer.initializeFirebase();
const db = firebase.firestore();

const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const category = document.getElementById('category');
let btnProduct = document.getElementById('product');



    // const validatespace = (event) =>{
    //     if(event.target.trim() == ''){
    //         alert('Ingrese su producto')
    //     }else{
    //         alert('Gracias por resgitrar su producto');
    //     }  
    //     };
    //     validatespace(event);



btnProduct.addEventListener('click', event => { 
    // validatespace();
    let array = [];
db.collection('products').add({ 
    category: category.value,
    name: name.value,
    price: price.value,
    quantity: quantity.value,

});
array.push(collection).then(function(docRef){
    console.log('Document written with ID: ', docRef.id);
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('category').value ='';
    // validatespace(event);
}).catch(error => {
    // validatespace(event);

console.log('Error adding document:', error);
})

});
console.log('sus datos han sido ingresados');