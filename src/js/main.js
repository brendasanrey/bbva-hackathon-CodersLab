
window.getData = () =>{
    fetch('https://raw.githubusercontent.com/sanrey254/bbva-hackathon-CodersLab/master/src/docs/data.json').then(result => result.json())
    .then(result =>{
        drawQrCode(result);
    })
}

window.drawQrCode = (result) =>{ 
    const resultToString = JSON.stringify(result);
    const url =`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${resultToString}`;
    console.log(url); 
    document.getElementById('code').src = url;
}

getData();