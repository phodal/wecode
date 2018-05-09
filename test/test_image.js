var fs = require("fs");
var imageData = fs.readFileSync('./test.jpg');
console.log(Buffer.from(imageData));
console.log(Buffer.from(imageData, "utf8"));
let encodedMessage = Buffer.from(Buffer.from(imageData, 'utf8').toString('utf8'), "binary");
console.log(encodedMessage);

