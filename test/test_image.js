var fs = require("fs");
var imageData = fs.readFileSync('./test.jpg');
console.log(Buffer.from(imageData));
console.log(Buffer.from(imageData, "utf8"));
console.log(Buffer.from(imageData, "ascii"));
