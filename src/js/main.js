var typeNumber = 4;
var errorCorrectionLevel = 'L';
var qr = qrcode(typeNumber, errorCorrectionLevel);
qr.addData('Hola palmidia!');
qr.make();
document.getElementById('placeHolder').innerHTML = qr.createImgTag();