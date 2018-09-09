let navabar = document.getElementById('search-nav');
navabar.style.display= 'none';
let status = false;
document.getElementById('searching-btn').addEventListener('click', event =>{
    event.preventDefault();
    if(status){
        navabar.style.display = 'none';
        status = false;
    }else{
        navabar.style.display = 'block';
        status = true;
    }
    
})