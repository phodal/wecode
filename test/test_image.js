var fs = require("fs");
var imageData = fs.readFileSync('./test.jpg');
var serverData2 = fs.readFileSync('./test2.jpg');

console.log(Buffer.from(imageData));
let encodedMessage = Buffer.from(imageData, 'binary').toString('utf8');
// console.log(encodedMessage);

console.log(Buffer.from(encodedMessage, 'utf8'));
console.log(Buffer.from(Buffer.from(serverData2).toString("binary")));
