var fs = require("fs");
var imageData = fs.readFileSync('./test.jpg');
console.log(Buffer.from(imageData));
console.log(Buffer.from(imageData, "utf8"));
let encodedMessage = Buffer.from(imageData, 'utf8').toString('utf8');
// console.log(encodedMessage);

console.log(Buffer.from(encodedMessage, 'utf8'));

