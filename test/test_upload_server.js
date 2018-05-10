var express = require("express");
var multer = require('multer');
var multerupload = multer();
var app = express();

var router = express.Router();

router.post('/upload', multerupload.any(), function(req, res){
  console.log(req.files);
  res.send({
    "code":"200",
    "success":"files printed successfully"
  })
});

app.use('/api', router);
app.listen(4000);
